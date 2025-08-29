import { useEffect, useState } from "react";
import { getTripAnalytics } from "../../services/authServices";

function TripAnalysisMain() {

  const [analytics, setAnalytics] = useState(null);
  useEffect(()=> {
    fetchAnalytics();
  }, []);
  
  const fetchAnalytics = async()=> {
     try {
       const result = await getTripAnalytics();
       console.log("Analytics fetched:", result.data); // <— Check here
       setAnalytics(result.data);
     } catch(error) {
      console.log("Error in fetch analytics is: ", error.message);
     }
  }

  const completed = analytics?.completedVsCancelled?.find(r => r._id === "completed")?.count || 0;
const cancelled = analytics?.completedVsCancelled?.find(r => r._id === "cancelled")?.count || 0;


  return (
    <div className="main_container w-full px-4 sm:px-6 lg:px-28 xl:px-36 py-6 overflow-auto hide-scrollbar mx-auto space-y-8 text-white">

      {/* Heading */}
      <h1 className="text-3xl font-bold">📊 Trip Analytics Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-indigo-600 p-4 sm:p-5 rounded-xl shadow-lg">
          <p className="text-sm sm:text-base text-indigo-200">Total Trips</p>
          <h2 className="text-xl sm:text-2xl font-semibold">{analytics?.totalTrips || 0}</h2>
        </div>
        <div className="bg-green-600 p-4 sm:p-5 rounded-xl shadow-lg">
          <p className="text-sm sm:text-base text-green-200">Active Users This Week</p>
          <h2 className="text-xl sm:text-2xl font-semibold">{analytics?.activeUsers || 0}</h2>
        </div>
        <div className="bg-yellow-500 p-4 sm:p-5 rounded-xl shadow-lg">
          <p className="text-sm sm:text-base text-yellow-100">Total Fare Collected</p>
          <h2 className="text-xl sm:text-2xl font-semibold">₹{analytics?.totalFare || 0}</h2>
        </div>
        <div className="bg-pink-600 p-4 sm:p-5 rounded-xl shadow-lg">
          <p className="text-sm sm:text-base text-pink-200">Avg Trips Per User</p>
          <h2 className="text-xl sm:text-2xl font-semibold">{analytics?.avgTrips?.toFixed(1) || 0}</h2>
        </div>
      </div>

      {/* Weekly Booking Trends */}
      <div className="bg-slate-800 p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-4">📅 Weekly Booking Trends</h3>
        <div className="flex items-end gap-4 h-36 overflow-x-auto">
          {analytics?.weeklyTrends?.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center min-w-[40px]">
              <div style={{ height: `${item.count * 15}px` }} className="w-6 bg-indigo-400 rounded-md"></div>
              <p className="text-xs mt-1 text-gray-300">
                {['Sun', 'Mon','Tue','Wed','Thu','Fri','Sat'][item._id-1]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Top Routes Table */}
      <div className="bg-slate-800 p-6 rounded-xl shadow-md overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">🚏 Most Booked Routes</h3>
        <table className="w-full text-sm text-left text-gray-300">
          <thead>
            <tr className="text-indigo-300 border-b border-indigo-400">
              <th className="py-2 pr-4">Route</th>
              <th className="py-2 pr-4">Trips</th>
              <th className="py-2">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {analytics?.topRoutes?.map((route, idx) => (
    <tr key={idx}>
      <td className="py-2 pr-4">{route.source} → {route.destination}</td>
      <td className="py-2 pr-4">{route.trips}</td>
      <td className="py-2">₹{route.revenue}</td>
    </tr>
  ))}
          </tbody>
        </table>
      </div>

      {/* Completed vs Cancelled */}
      <div className="bg-slate-800 p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-4">✅ Completed vs ❌ Cancelled Trips</h3>
        <div className="flex flex-col sm:flex-row gap-4 text-base sm:text-lg font-medium text-gray-300">
          <div className="flex-1 bg-green-700 p-4 rounded-md text-center">✅ Completed: {completed}</div>
          <div className="flex-1 bg-red-600 p-4 rounded-md text-center">❌ Cancelled: {cancelled}</div>
        </div>
      </div>

    </div>
  );
}

export default TripAnalysisMain;
