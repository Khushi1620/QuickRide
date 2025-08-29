import { useState, useEffect } from "react";
import { adminProfile } from "../../services/authServices";
import { useNavigate } from "react-router-dom";

function AdminDashboardMain() {
  const navigate = useNavigate();
  const [res, setRes] = useState({
    totalUsers: 0,
    tripsThisMonth: 0,
    revenue: 0,
    totalRoutes: 0,
    monthlyTrips: [],
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const result = await adminProfile();
      console.log("API Full Response:", result);

      // safe check (agar response nested hai toh yaha handle karega)
      const data = result.data?.data || result.data || result;

      console.log("API Data Used:", data);

      setRes({
        totalUsers: data.totalUsers || 0,
        tripsThisMonth: data.tripsThisMonth || 0,
        revenue: data.revenue || 0,
        totalRoutes: data.totalRoutes || 0,
        monthlyTrips:
          data.monthlyTrips?.length > 0
            ? data.monthlyTrips
            : [1, 2, 4, 6, 8, 3, 5, 3, 6, 7, 2, 0],
      });
    } catch (error) {
      console.log("Error in fetch dashboard data is: ", error.message);
    }
  };

  return (
    <div className="main_container w-full px-4 sm:px-6 lg:px-28 xl:px-36 py-6 overflow-auto hide-scrollbar mx-auto text-white space-y-10">
      {/* Heading */}
      <h1 className="text-3xl font-bold">📊 Admin Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-indigo-600 p-5 rounded-xl shadow-lg">
          <p className="text-sm text-indigo-200">Total Users</p>
          <h2 className="text-2xl font-semibold">{res.totalUsers}</h2>
        </div>
        <div className="bg-green-600 p-5 rounded-xl shadow-lg">
          <p className="text-sm text-green-200">Trips This Month</p>
          <h2 className="text-2xl font-semibold">{res.tripsThisMonth}</h2>
        </div>
        <div className="bg-yellow-500 p-5 rounded-xl shadow-lg">
          <p className="text-sm text-yellow-100">Revenue Collected</p>
          <h2 className="text-2xl font-semibold">₹{res.revenue}</h2>
        </div>
        <div className="bg-pink-600 p-5 rounded-xl shadow-lg">
          <p className="text-sm text-pink-200">Total Routes</p>
          <h2 className="text-2xl font-semibold">{res.totalRoutes}</h2>
        </div>
      </div>

      {/* Quick Access Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 p-6 rounded-xl shadow-md space-y-2">
          <h3 className="text-lg font-semibold mb-2">🛣 Manage Routes</h3>
          <p className="text-gray-300 text-sm">
            Add, update or delete shuttle routes across campus.
          </p>
          <button
            onClick={() => navigate("/admin/manageRoutes")}
            className="mt-2 cursor-pointer px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium"
          >
            Go to Routes
          </button>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl shadow-md space-y-2">
          <h3 className="text-lg font-semibold mb-2">🚐 Manage Shuttles</h3>
          <p className="text-gray-300 text-sm">
            Update shuttle details or assign drivers.
          </p>
          <button
            onClick={() => navigate("/admin/manageShuttles")}
            className="mt-2 px-4 py-2 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium"
          >
            Go to Shuttles
          </button>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl shadow-md space-y-2">
          <h3 className="text-lg font-semibold mb-2">👥 View Users</h3>
          <p className="text-gray-300 text-sm">
            Check user list, trips, and wallet balance.
          </p>
          <button
            onClick={() => navigate("/admin/viewUser")}
            className="mt-2 px-4 cursor-pointer py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium"
          >
            View Users
          </button>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-slate-800 p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-4">
          📈 Monthly Trip Overview
        </h3>
        <div className="flex items-end gap-4 h-36">
          {res.monthlyTrips.map((val, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div
                style={{ height: `${val * 4}px` }}
                className="w-6 bg-indigo-400 rounded-md"
              ></div>
              <p className="text-xs mt-1 text-gray-300">
                {
                  [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sept",
                    "Oct",
                    "Nov",
                    "Dec",
                  ][idx]
                }
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardMain;