import { useEffect, useState } from "react";
import { getTripHistory } from "../../services/authServices";

function TripHistoryMain() {
  const [trips, setTrips] = useState([]);

  useEffect(()=> {
    fetchTrips();
  }, []);

  const fetchTrips = async ()=> {
    try{
      const result = await getTripHistory();
      const data = result?.data || [];
      setTrips(data);
    } catch(error) {
      console.log("Error in fetch trips is: ", error.message);
    }
  }

  return (
    <div className="main_container w-full px-4 sm:px-6 lg:px-28 xl:px-36 py-6 overflow-auto hide-scrollbar mx-auto">
      <h1 className="text-3xl font-semibold m-6">📜 Trip History</h1>

      <div className="flex flex-col gap-6">
        {trips.length === 0 && <p className="justify-center flex">No trips found.</p>}
        {trips.map((trip) => (
          <div key={trip._id} className="bg-gray-800 p-5 rounded-lg shadow-md text-white">
            <h2 className="text-xl font-semibold mb-2">
              🚌 {trip.routeId.source} → {trip.routeId.destination}
            </h2>
            <div className="flex flex-col md:flex-row justify-between text-sm md:text-base text-gray-300">
              <p>📅 Date: {new Date(trip.tripDate).toLocaleDateString()}</p>
              <p>⏰ Time: {new Date(trip.tripDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              <p>💰 Fare: ₹{trip.fare}</p>
              <p className={trip.status === "completed" ? "text-green-400" : trip.status === "cancelled" ? "text-red-400" : "text-yellow-400"}>
                {trip.status === "completed" ? "✅ Completed" : trip.status === "cancelled" ? "❌ Cancelled" : "⏳ Pending"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TripHistoryMain;
