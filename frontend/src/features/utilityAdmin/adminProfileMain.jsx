import { useEffect, useState } from "react";
import { adminProfile, logoutAdmin, updateProfileAdmin } from "../../services/authServices";
import {useNavigate} from "react-router-dom";

function AdminProfileMain() {

  const [admin, setAdmin] = useState(null);
  
  useEffect(()=> {
    fetchAdminData();
  }, []);

  const fetchAdminData = async()=> {
    try {  
      const result = await adminProfile();
      setAdmin(result.data);
    } catch(error) {
      console.log("Error in fetch admin data is: ", error.message);
    }
  }

  const navigate = useNavigate();
  const handleLogout = async ()=> {
      try {
        await logoutAdmin();
        alert("Logged out successfully...!!!");
        navigate("/");
      } catch(error) {
        console.log("Error in logout user: ", error.message);
        alert("Logout failed...!!!");
      }
  }

  return (
    <div className="main_container w-full px-4 sm:px-6 lg:px-28 xl:px-36 py-6 overflow-auto hide-scrollbar mx-auto text-white flex justify-center">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-6xl space-y-10">

        {/* 🧑‍💼 Admin Basic Info */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex flex-col items-center md:items-start gap-3 w-full md:w-[30%]">
            <div className="h-24 w-24 rounded-full bg-indigo-600 flex items-center justify-center text-5xl ring-4 ring-indigo-400 shadow-lg">
              🧑‍💼
            </div>
            <h2 className="text-2xl font-bold">{admin?.firstName && admin?.lastName ? `${admin.firstName} ${admin.lastName}` : "Admin name"}</h2>
            <p className="text-indigo-300 text-sm">Administrator</p>
            <p className="text-gray-400 text-sm">
              Last Login: {admin?.lastLogin ? new Date(admin.lastLogin).toLocaleString() : "—"}
            </p>
          </div>

          {/* 🔍 Admin Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
            <div className="bg-slate-800 p-4 rounded-lg shadow">
              <p className="text-gray-400 text-sm mb-1">📧 Email</p>
              <p className="text-lg font-medium">{admin?.emailId || "_"}</p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg shadow">
              <p className="text-gray-400 text-sm mb-1">🆔 Role</p>
              <p className="text-indigo-300 font-medium">{admin?.role || "_"}</p>
            </div>
          </div>
        </div>

        {/* 📊 Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-indigo-600 p-5 rounded-xl shadow-lg">
            <p className="text-sm text-indigo-200">Total Users</p>
            <h2 className="text-2xl font-semibold">{admin?.totalUsers ?? "_"}</h2>
          </div>
          <div className="bg-green-600 p-5 rounded-xl shadow-lg">
            <p className="text-sm text-green-200">Total Trips</p>
            <h2 className="text-2xl font-semibold">{admin?.totalTrips ?? "_"}</h2>
          </div>
          <div className="bg-yellow-500 p-5 rounded-xl shadow-lg">
            <p className="text-sm text-yellow-100">Total Revenue</p>
            <h2 className="text-2xl font-semibold">₹{admin?.totalRevenue ?? "_"}</h2>
          </div>
        </div>

        {/* 🧾 Activity Log */}
        <div className="bg-slate-800 p-6 rounded-xl shadow-md space-y-3">
          <h3 className="text-lg font-semibold text-indigo-300 mb-2">🕵️‍♀️ Recent Admin Activities</h3>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            {admin?.activities?.length > 0 ? (
              admin.activities.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))
            ) : (
              <li>No recent activities</li>
            )}
          </ul>
        </div>

        {/* ⚙️ Quick Actions */}
        <div className="flex justify-end gap-4 pt-4">
          <button className="px-5 py-2 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow transition">
            ✏️ Edit Profile
          </button>
          <button onClick={handleLogout} className="px-5 py-2 cursor-pointer bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md shadow transition">
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminProfileMain;