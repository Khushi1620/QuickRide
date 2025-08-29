import { useState, useEffect } from "react";
import { userProfile, logoutUser } from "../../services/authServices";
import {useNavigate} from 'react-router-dom';

function UserProfileMain() {

 const [profile, setProfile] = useState(null);
 const navigate = useNavigate();

 useEffect(()=> {
  fetchProfile();
 }, []);

 const fetchProfile = async ()=> {
    try {
      const result = await userProfile();
      const data = result?.data?.data || result.data;
      setProfile(data);
    } catch(error) {
      console.log("Error in fetch user profile is: ", error.message);
    }
 }

 const handleLogout = async ()=> {
     try {
      await logoutUser();
      alert("Logged out successfully...!!!");
      navigate("/");
     } catch(error) {
      console.log("Error in logout user is: ", error.message);
     }
 }

  return (
    <div className="main_container w-full px-4 sm:px-6 lg:px-28 xl:px-36 py-6 overflow-auto hide-scrollbar mx-auto flex justify-center">
      <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-2xl w-full max-w-6xl space-y-10">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex flex-col items-center md:items-start gap-3 w-full md:w-[30%]">
            <div className="h-24 w-24 rounded-full bg-indigo-600 flex items-center justify-center text-5xl ring-4 ring-indigo-400 shadow-lg">👤</div>
            <h2 className="text-2xl font-bold">{profile?.name}</h2>
            <p className="text-indigo-300 text-sm">{profile?.role}</p>
            <p className="text-gray-400 text-sm">Registered on: {profile?.registeredOn ? new Date(profile.registeredOn).toLocaleDateString() : "N/A"}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
            <div className="bg-slate-800 p-4 rounded-lg shadow">
              <p className="text-gray-400 text-sm mb-1">📧 Email</p>
              <p className="text-lg font-medium">{profile?.email}</p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg shadow">
              <p className="text-gray-400 text-sm mb-1">💰 Wallet Balance</p>
              <p className="text-green-400 font-semibold text-lg">₹{profile?.wallet}</p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg shadow">
              <p className="text-gray-400 text-sm mb-1">🧾 Role</p>
              <p className="text-indigo-300 font-medium">{profile?.role}</p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg shadow">
              <p className="text-gray-400 text-sm mb-1">🕓 Last Login</p>
              <p className="text-white text-lg">{profile?.lastLogin ? new Date(profile.lastLogin).toLocaleString() : "N/A"}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">📊 Weekly Booking Activity</h3>
          <div className="flex items-end gap-4 h-36">
            {profile?.weeklyActivity?.map((val, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div style={{ height: `${val * 20}px` }} className="w-6 bg-indigo-500 rounded-md"></div>
                <p className="text-xs mt-1 text-gray-400">Day {idx + 1}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-3">💼 Wallet Usage Summary</h3>
            <ul className="text-sm space-y-2 text-gray-300">
              <li>
                • Last Recharge: ₹{profile?.walletSummary?.lastRecharge?.amount} on{" "}
                {profile?.walletSummary?.lastRecharge?.date
                  ? new Date(profile?.walletSummary?.lastRecharge?.date).toLocaleDateString()
                  : "N/A"}
              </li>
              <li>• Total Spent: ₹{profile?.walletSummary?.totalSpent}</li>
              <li>• Total Recharges: ₹{profile?.walletSummary?.totalRecharges}</li>
            </ul>
          </div>
          <div className="bg-slate-800 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-3">📅 Next Upcoming Trip</h3>
            <ul className="text-sm space-y-2 text-gray-300">
              <li>• Route: {profile?.nextTrip?.route}</li>
               <li>
                • Time:{" "}
                {profile?.nextTrip?.time
                  ? new Date(profile?.nextTrip?.time).toLocaleString()
                  : "N/A"}
              </li>
              <li>• Shuttle No: #{profile?.nextTrip?.shuttleNo}</li>
            </ul>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">🧾 Recent Trips</h3>
           <ul className="text-sm space-y-3 text-gray-300">
            {profile?.recentTrips?.map((trip, idx) => (
              <li key={idx}>
                • {new Date(trip.date).toLocaleDateString()} – {trip.route} – ₹{trip.fare}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-end gap-4">
          <button className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-sm transition">
            ✏️ Edit Profile
          </button>
          <button onClick={handleLogout} className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md shadow-sm transition">
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfileMain;
