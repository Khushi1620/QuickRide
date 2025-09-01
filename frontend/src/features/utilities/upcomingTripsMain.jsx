import { useState, useEffect } from "react";
import { getTripHistory, cancelTrip } from "../../services/authServices";

function UpcomingTripsMain() {

  const [trips, setTrips] = useState([]);
  useEffect(()=> {
    fetchTrips();
  }, []);

  const fetchTrips = async()=> {
    try {
      const result = await getTripHistory();
      const allTrips = result.data;
      const upcomingTrips = allTrips.filter(
        trip=> new Date(trip.tripDate) > new Date() && trip.status === 'booked'
      );
      setTrips(upcomingTrips);
    } catch(error) {
      console.log("Error in fetch trips is: ", error.message);
    }
  };

  const handleCancelTrips = async(id)=> {
    try {
      await cancelTrip(id);
      fetchTrips();
    } catch(error) {
      console.log("Error in cancel trips is: ", error.message);
    }
  };

 return (
    <div className="main_container w-full px-4 sm:px-6 lg:px-28 xl:px-36 py-6 overflow-auto hide-scrollbar mx-auto">
      <h1 className="text-3xl font-semibold m-6">📅 Upcoming Trips</h1>

      <div className="flex flex-col gap-6">
        {trips.length > 0 ? (
          trips.map(trip => (
            <div key={trip._id} className="bg-gray-800 p-5 rounded-lg shadow-md text-white">
              <h2 className="text-xl font-semibold mb-2">
                🚌 {trip.routeId.source} → {trip.routeId.destination}
              </h2>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-sm md:text-base text-gray-300 gap-2">
                <p>📅 Date: {new Date(trip.tripDate).toLocaleDateString()}</p>
                <p>⏰ Time: {new Date(trip.tripDate).toLocaleTimeString()}</p>
                <p>💰 Fare: ₹{trip.fare}</p>
                <button
                  onClick={() => handleCancelTrips(trip._id)}
                  className="bg-red-600 cursor-pointer hover:bg-red-700 px-4 py-1 rounded text-white font-medium"
                >
                  ❌ Cancel Trip
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No upcoming trips found.</p>
        )}
      </div>
    </div>
  );
}

export default UpcomingTripsMain;
