import { bookMyTrip, getRoutes, checkAvailability } from "../../services/authServices";
import { useState, useEffect } from "react";

function BookMyTripMain() {
  const [routes, setRoutes] = useState([]);

  const [newBooking, setNewBooking] = useState({
    routeId: "",
    shuttleId: "",
    date: "",
    time: "",
    fare: 0
  });

  const fetchRoutes = async () => {
    try {
      const result = await getRoutes();
      setRoutes(result.data.routes || []);
    } catch (error) {
      console.log("Error in fetch routes in book trip are: ", error.message);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  // update fare and shuttleId when route changes
  useEffect(() => {
    const selectedRoute = routes.find((r) => r._id === newBooking.routeId);
    if (selectedRoute) {
      setNewBooking((data) => ({
        ...data,
        fare: selectedRoute.fare,
        shuttleId: selectedRoute.shuttleId || ""
      }));
    } else {
      setNewBooking((data) => ({
        ...data,
        fare: 0,
        shuttleId: ""
      }));
    }
  }, [newBooking.routeId, routes]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newBooking.routeId || !newBooking.date || !newBooking.time) {
      alert("Required fields are missing...!!!");
      return;
    }
    if (!newBooking.shuttleId) {
      alert("Shuttle not assigned for this route."); 
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const tripDateTime = `${newBooking.date} ${newBooking.time}`;
      const availability = await checkAvailability(
        {
          shuttleId: newBooking.shuttleId,
          tripDate: tripDateTime
        },
        token
      );

      if (availability.data.availableSeats <= 0) {
        alert("No seats available for this date/time!");
        return;
      }

      const result = await bookMyTrip(
        {
          routeId: newBooking.routeId,
          tripDate: tripDateTime
        },
        token
      );

      console.log(result.data.message);
      setNewBooking({
        routeId: "",
        shuttleId: "",
        date: "",
        time: "",
        fare: 0
      });
    } catch (error) {
      console.log("Error in handle submit in book my trips are: ", error.message);
    }
  };

  return (
    <div className="main_container w-full p-6 overflow-y-auto hide-scrollbar flex flex-col items-center gap-10 text-white">
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-semibold mb-6">🚌 Book a New Shuttle Trip</h1>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-lg mb-1">🗺 Select Route</label>
            <select
              value={newBooking.routeId}
              onChange={(e) => setNewBooking({ ...newBooking, routeId: e.target.value })}
              className="w-full p-3 rounded-md bg-slate-100 text-black"
            >
              <option value="">Choose Route</option>
              {routes.map((route) => (
                <option key={route._id} value={route._id}>
                  {route.source} → {route.destination} (₹{route.fare})
                </option>
              ))}
            </select>
          </div>

          <div className="bg-slate-700 text-white p-4 rounded-md shadow">
            <p className="text-sm text-gray-300">💰 Estimated Fare:</p>
            <p className="text-xl font-bold text-green-400">₹{newBooking.fare}</p>
          </div>

          <div>
            <label className="block text-lg mb-1">📅 Select Date</label>
            <input
              value={newBooking.date}
              onChange={(e) => setNewBooking({ ...newBooking, date: e.target.value })}
              type="date"
              className="w-full p-3 rounded-md bg-slate-100 text-black"
            />
          </div>

          <div>
            <label className="block text-lg mb-1">⏰ Select Time</label>
            <input
              value={newBooking.time}
              onChange={(e) => setNewBooking({ ...newBooking, time: e.target.value })}
              type="time"
              className="w-full p-3 rounded-md bg-slate-100 text-black"
            />
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-md text-white font-semibold"
            >
              Book Trip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookMyTripMain;
