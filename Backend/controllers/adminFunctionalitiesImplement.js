const User = require("../models/user");
const Booking = require("../models/booking");
const validateUser = require("../utils/validateUsers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const redisClient = require("../config/redis");

const adminRegister = async (request, response) => {
  try {
    validateUser(request.body);
    const { emailId, password } = request.body;
    request.body.password = await bcrypt.hash(password, 10);
     request.body.walletBalance = undefined;
    request.body.role = "admin";
    const user = await User.create(request.body);
    const token = jwt.sign(
      { _id: user.id, emailId: emailId, role: "admin" },
      process.env.JWT_KEY,
      { expiresIn: 60 * 60 }
    );

    response.cookie("adminToken", token, { maxAge: 60 * 60 * 1000 });
    response.status(201).send("Admin registered successfully...!!!");
  } catch (error) {
    response.status(400).send("Error is: " + error);
  }
};
const adminRechargeWallet = async (request, response) => {
  try {
    const { emailId, amount } = request.body;
    console.log("admin recharge", request.body);

    // Validation
    if (!emailId || !amount || amount <= 0) {
      return response.status(400).json({ error: "Invalid input!" });
    }

    // Find user
    const user = await User.findOne({ emailId });
    if (!user) {
      return response.status(404).json({ error: "User not found!" });
    }

    // Recharge
    user.walletBalance += amount;
    await user.save();

  return response.status(200).json({
  message: "Wallet recharged successfully!",
  user: {
    firstName: user.firstName,
    emailId: user.emailId,
  }
});

  } catch (error) {
    console.error("Recharge error:", error);
    return response.status(500).json({ error: "Internal server error" });
  }
};
const getAllUsers = async (request, response)=> {
  try {
    const users = await User.find({ role: 'user' });
    response.status(200).send(users);
  } catch(error){
    response.status(400).send("Error in getAllUsers: "+ error.message);
  }
}
const adminLogout = async (request, response) => {
  try {
    const token = request.cookies.token || request.cookies.adminToken;
    const payload = jwt.decode(token);
    await redisClient.set(`token:${token}`, "Blocked");
    await redisClient.expireAt(`token:${token}`, payload.exp);
    response.cookie("adminToken", null, { expires: new Date(Date.now()) });
    response.send("Logged out successfully...!!!");
  } catch (error) {
    response.status(503).send("Error is: " + error);
  }
};
const getAdminProfile = async (request, response) => {
  try { 
    const token = request.cookies.token || request.cookies.adminToken;
    if (!token) {
      throw new Error("Token is not present...!!!");
    }

    const payload = jwt.verify(token, process.env.JWT_KEY);
    const admin = await User.findById(payload._id);
    if (!admin || admin.role !== "admin") {
      throw new Error("Access denied...!!!");
    }

    const totalUsers = await User.countDocuments({ role: "user" });
    const totalTrips = await Booking.countDocuments();

    const totalRevenueAgg = await Booking.aggregate([
      { $group: { _id: null, total: { $sum: "$fare" } } }
    ]);
    const totalRevenue = totalRevenueAgg.length > 0 ? totalRevenueAgg[0].total : 0;

    // ✅ Monthly trips aggregation for dashboard graph
    const monthlyTrips = await Booking.aggregate([
      { 
        $group: {
          _id: { month: { $month: "$date" }, year: { $year: "$date" } },
          trips: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    response.status(200).json({
      firstName: admin.firstName,
      lastName: admin.lastName,
      emailId: admin.emailId,
      role: admin.role,
      totalUsers,
      totalTrips,
      totalRevenue,
      monthlyTrips // 👈 frontend use करेगा
    });

  } catch (error) {
    response.status(400).send(`Error in admin profile is: ${error.message}`);
  }
};
const getTripAnalytics = async(request, response)=> {
  try {
    const totalTrips = await Booking.countDocuments();
    const activeUsersThisWeek = await Booking.distinct("userId", {
      createdAt: {$gte: new Date(Date.now()-7*24*60*60*1000)}
    });
    const totalFare = await Booking.aggregate(
      [{$group: {_id: null, total: {$sum: "$fare"}}}]
    );
    const totalUsers = await User.countDocuments({role: "user"});
    const avgTripsPerUser = totalUsers > 0 ? totalTrips/totalUsers : 0;
    const weeklyTrends = await Booking.aggregate(
      [
        {
          $group: {
            _id: {$dayOfWeek: "$createdAt"},
            count: {$sum: 1}
          }
        },
        {$sort: {_id: 1}}
      ]
    );
    const topRoutes = await Booking.aggregate([
      {
        $group: {
          _id: "$routeId",
          trips: {$sum: 1},
          revenue: {$sum: "$fare"}
        }
      },
      { $sort: { trips: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "routes",
          localField: "_id",
          foreignField: "_id",
          as: "route"
        }
      },
      { $unwind: "$route" },
      {
        $project: {
          _id: 0,
          source: "$route.source",
          destination: "$route.destination",
          trips: 1,
          revenue: 1
        }
      }
    ]);
    const completedVsCancelled = await Booking.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    response.json({
      totalTrips,
      activeUsers: activeUsersThisWeek.length,
      totalFare: totalFare[0]?.total || 0,
      avgTrips: avgTripsPerUser,
      weeklyTrends,
      topRoutes,
      completedVsCancelled
    });
  } catch(error) {
    response.status(400).send("Error in get trip analytics is: " + error.message);
  }
}


module.exports = {
  adminRegister,
  adminRechargeWallet,
  getAllUsers,
  adminLogout,
  getAdminProfile,
  getTripAnalytics
};
