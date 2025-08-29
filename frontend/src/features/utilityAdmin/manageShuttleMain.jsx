import { useState, useEffect } from "react";
import {
  addShuttle,
  getShuttle,
  getShuttleById,
  updateShuttle,
  updateStatus,
  deleteShuttle,
  getRoutes
} from "../../services/authServices";

function ManageShuttleMain() {
  const [newShuttle, setNewShuttle] = useState({
    busNumber: "",
    capacity: "",
    routeId: "",
    driverName: "",
    currentStatus: "",
  });

  const [shuttle, setShuttle] = useState([]);
  const [editShuttle, setEditShuttle] = useState(null);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    fetchRoutes();
    fetchShuttle();
  }, []);

  const fetchShuttle = async () => {
    try {
      const result = await getShuttle();
      setShuttle(result.data.shuttle || []);
    } catch (error) {
      console.log("Error in fetch shuttle is: ", error.message);
    }
  };

  const fetchRoutes = async()=> {
    try {
      const result = await getRoutes();
      setRoutes(result.data.routes || []);
    } catch(error) {
      console.log("Error in fetch routes in shuttle is: ", error.message);
    }
  }

  const handleAddShuttle = async () => {
    if (
      !newShuttle.busNumber ||
      !newShuttle.capacity ||
      !newShuttle.routeId ||
      !newShuttle.driverName ||
      !newShuttle.currentStatus
    ) {
      alert("Required field missing...!!!");
      return;
    }
    try {
      await addShuttle(newShuttle);
      console.log("Shuttle added successfully...!!!");
      setNewShuttle({
        busNumber: "",
        capacity: "",
        routeId: "",
        driverName: "",
        currentStatus: "",
      });
      fetchShuttle();
    } catch (error) {
      console.log("Error in handle add shuttle is: ", error.message);
    }
  };

  const handleDeleteShuttle = async (id) => {
    if (!window.confirm("Are you sure want to delete the shuttle..??")) {
      return;
    }
    try {
      await deleteShuttle(id);
      fetchShuttle();
    } catch (error) {
      console.log("Error in handle delete shuttle is: ", error.message);
    }
  };

  const handleEditShuttle = (shuttle) => {
    setEditShuttle(shuttle);
    setNewShuttle({
      busNumber: shuttle.busNumber,
      capacity: shuttle.capacity,
      routeId: shuttle.routeId,
      driverName: shuttle.driverName,
      currentStatus: shuttle.currentStatus,
    });
  };

  const handleUpdateShuttle = async () => {
    try {
      await updateShuttle(editShuttle._id, newShuttle);
      setNewShuttle({
        busNumber: "",
        capacity: "",
        routeId: "",
        driverName: "",
        currentStatus: "",
      });
      setEditShuttle(null);
      fetchShuttle();
    } catch (error) {
      console.log("Error in handle update shuttle is: ", error.message);
    }
  };
  // update status is pending

  return (
    <div className="main_container w-full px-4 sm:px-6 lg:px-28 xl:px-36 py-6 overflow-auto hide-scrollbar mx-auto text-white space-y-10">
      <h1 className="text-3xl font-bold">🚌 Manage Shuttles</h1>

      {/* ➕ Add New Shuttle */} 
      <div className="bg-slate-800 p-6 rounded-xl shadow-md space-y-4">
        <h2 className="text-xl font-semibold">➕ Add New Shuttle</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <input
            type="text"
            placeholder="Shuttle Number"
            value={newShuttle.busNumber}
            onChange={(e)=> setNewShuttle({...newShuttle, busNumber: e.target.value})}
            className="p-3 rounded-md bg-slate-100 text-black"
          />
          <input
            type="number"
            placeholder="Capacity"
            value={newShuttle.capacity}
            onChange={(e)=> setNewShuttle({...newShuttle, capacity: e.target.value})}
            className="p-3 rounded-md bg-slate-100 text-black"
          />
          <select value={newShuttle.routeId} onChange={(e)=> setNewShuttle({...newShuttle, routeId: e.target.value})} className="p-3 rounded-md bg-slate-100 text-black">
            <option value="">Select Route</option>
            {routes.map((route)=> (
              <option key={route._id} value={route._id}>{route.source} → {route.destination}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Driver Name / ID"
            value={newShuttle.driverName}
            onChange={(e)=> setNewShuttle({...newShuttle, driverName: e.target.value})}
            className="p-3 rounded-md bg-slate-100 text-black"
          />
          <select
  value={newShuttle.currentStatus}
  onChange={(e) =>
    setNewShuttle({ ...newShuttle, currentStatus: e.target.value })
  }
  className="p-3 rounded-md bg-slate-100 text-black"
>
  <option value="">Select Status</option>
  <option value="available">Available</option>
  <option value="trip">Trip</option>
  <option value="maintenance">Maintenance</option>
</select>

        </div>
        <button onClick={editShuttle ? handleUpdateShuttle : handleAddShuttle} className="mt-3 bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-md text-white font-semibold">
           {editShuttle ? "Update Shuttle" : "➕ Add Shuttle"}
        </button>
      </div>

      {/* 📋 Existing Shuttles Table */}
      <div className="bg-slate-800 p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">📋 Existing Shuttles</h2>
        <table className="w-full text-sm text-left text-gray-300">
          <thead>
            <tr className="text-indigo-300 border-b border-indigo-400">
              <th className="py-2">#</th>
              <th className="py-2">Shuttle No</th>
              <th className="py-2">Capacity</th>
              <th className="py-2">Route</th>
              <th className="py-2">Driver</th>
              <th className="py-2">Status</th>
              <th className="py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {shuttle.length > 0 ? (
              shuttle.map((shuttle, index)=> (
                <tr key={shuttle._id} className="border-b border-gray-600">
                  <td className="py-2">{index+1}</td>
                  <td>{shuttle.busNumber}</td>
                  <td>{shuttle.capacity}</td>
                  <td>
  {shuttle.routeId && shuttle.routeId.source
    ? `${shuttle.routeId.source} → ${shuttle.routeId.destination}`
    : "N/A"}
</td>
                  <td>{shuttle.driverName}</td>
                  <td>{shuttle.currentStatus}</td>
                  <td className="text-right space-x-2">
                    <button onClick={()=> handleEditShuttle(shuttle)} className="bg-yellow-500 cursor-pointer px-3 py-1 rounded hover:bg-yellow-600 text-sm">✏️ Edit</button>
                    <button onClick={()=> handleDeleteShuttle(shuttle._id)} className="bg-red-600 cursor-pointer px-3 py-1 rounded hover:bg-red-700 text-sm">🗑 Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="7" className="text-center py-4">No Shuttles Found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageShuttleMain;
