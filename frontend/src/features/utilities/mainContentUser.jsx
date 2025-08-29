import { useState, useEffect } from "react";
import { userProfile } from "../../services/authServices";

function MainContent() {

  const [profile, setProfile] = useState(null);

  useEffect(()=> {
    fetchProfile();
  }, []);

  const fetchProfile = async()=> {
    try {
      const result = await userProfile();
      const data = result?.data?.data || result.data;
      setProfile(data);
    } catch(error) {
      console.log("Error in fetch profile in user dashboard is: ", error.message);
    }
  }

  return (
    <div className="main_container w-full px-4 sm:px-6 lg:px-28 xl:px-36 py-6 overflow-auto hide-scrollbar mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Welcome, {profile?.name} 👋👋👋</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-indigo-600 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-white">Wallet Balance</h2>
          <p className="text-3xl font-bold mt-2 text-white">₹{profile?.wallet}</p>
        </div>
        <div className="bg-green-600 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-white">Upcoming Trips</h2>
          <p className="text-3xl font-bold mt-2 text-white">{profile?.upcomingTrips?.length || 0}</p>
        </div>
        <div className="bg-yellow-500 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-white">Completed Trips</h2>
          <p className="text-3xl font-bold mt-2 text-white">{profile?.completedTrips || 0}</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Your Upcoming Trips</h2>
      <div className="space-y-4 mb-8">
        {profile?.upcomingTrips?.length > 0 ? (
          profile?.upcomingTrips?.map((trip, index)=> (
            <div key={index}className="bg-gray-800 p-4 rounded-lg flex justify-between items-center text-white"
            ><div>
                <p className="text-lg font-medium">
                  From: {trip.from} → {trip.to}
                </p>
                <p className="text-sm text-gray-400">
                  {new Date(trip.time).toLocaleTimeString()} |{" "}
                  {new Date(trip.time).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  trip.status === "Confirmed"
                    ? "bg-green-600"
                    : "bg-rose-400"
                }`}
              >
                {trip.status}
              </span>
            </div>
          ))
        ): (<p className="text-gray-400">No upcoming trips found.</p>)}
      </div>

      <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full md:w-2/3 text-white">
        <p className="mb-2">👩‍🎓 Name: {profile?.name}</p>
        <p className="mb-2">📧 Email: {profile?.email}</p>
        <p className="mb-2">🎓 Role: {profile?.role}</p>
        <p className="mb-2">💰 Wallet: ₹{profile?.wallet}</p>
        <p>
          🕒 Last Trip: 
          {profile?.lastTrip
            ? new Date(profile?.lastTrip).toLocaleString()
            : " N/A"}
        </p>
      </div>
    </div>
  );
}

export default MainContent;
