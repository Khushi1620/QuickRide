import { useEffect, useState } from "react";
import { addRoute, getRoutes, getRouteById, updateRoute, deleteRoute } from "../../services/authServices";

function ManageRoutesMain() {

  const [newRoute, setNewRoute] = useState({
    source: "",
    destination: "",
    fare: "",
  });
  const [routes, setRoutes] = useState([]);
  const [editRoute, setEditRoute] = useState(null);

  useEffect(()=> {
    fetchRoutes();
  }, []);

  const fetchRoutes = async()=> {
    try {
      const result = await getRoutes();
      setRoutes(result.data.routes || []);
    } catch(error) {
      console.log("Error in fetch routes are: ", error.message);
    }
  }

  const handleAddRoutes = async()=> {
    if (! newRoute.source || ! newRoute.destination || ! newRoute.fare) {
       alert("Required field missing...!!!");
       return;
    }
    try {
      await addRoute(newRoute);
      console.log("I am added");
      setNewRoute(
        {
          source: "",
          destination: "",
          fare: "",
        }
      )
      fetchRoutes();
    } catch(error) {
      console.log("Error in add new Routes are: ", error.message);
    }
  }

  const handleDeleteRoutes = async (id)=> {
    if (! window.confirm("Are you sure want to delete this route..??")) {
      return;
    }
    try {
     await deleteRoute(id);
     fetchRoutes();
    } catch(error) {
      console.log("Error in delete routes: " , error.message);
    }
  }

  const handleEdit = (route)=> {
    setEditRoute(route);
    setNewRoute({
      source: route.source,
      destination: route.destination,
      fare: route.fare
    })
  };

  const handleUpdateRoutes = async()=> {
    try {
      await updateRoute(editRoute._id, newRoute);
      setNewRoute({
        source: "",
        destination: "",
        fare: ""
      });
      setEditRoute(null);
      fetchRoutes();
    } catch(error) {
      console.log("Error in updating routes: ", error.message);
    }
  }

  return (
    <div className="main_container w-full px-4 sm:px-6 lg:px-28 xl:px-36 py-6 overflow-auto hide-scrollbar mx-auto text-white space-y-10">

      {/* Heading */}
      <h1 className="text-3xl font-bold">🗺️ Manage Shuttle Routes</h1>

      {/* Add New Route */}
      <div className="bg-slate-800 p-6 rounded-xl shadow-md space-y-4">
        <h2 className="text-xl font-semibold">➕ Add New Route</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Start Location"
            value={newRoute.source}
            onChange={(e)=> setNewRoute({...newRoute, source: e.target.value})}
            className="p-3 rounded-md bg-slate-100 text-black"
          />
          <input
            type="text"
            placeholder="End Location"
            value={newRoute.destination}
            onChange={(e)=> setNewRoute({...newRoute, destination: e.target.value})}
            className="p-3 rounded-md bg-slate-100 text-black"
          />
          <input
            type="number"
            placeholder="Fare (₹)"
            value={newRoute.fare}
            onChange={(e)=> setNewRoute({...newRoute, fare: e.target.value})}
            className="p-3 rounded-md bg-slate-100 text-black"
          />
        </div>
        <button onClick={editRoute ? handleUpdateRoutes: handleAddRoutes} className="mt-3 cursor-pointer bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-md text-white font-semibold transition-all">
          {editRoute ? "Update Route" : "➕ Add Route"}
        </button>
      </div>

      {/* Existing Routes Table */}
      <div className="bg-slate-800 p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">📋 Existing Routes</h2>
        <table className="w-full text-sm text-left text-gray-300">
          <thead>
            <tr className="text-indigo-300 border-b border-indigo-400">
              <th className="py-2">#</th>
              <th className="py-2">Source</th>
              <th className="py-2">Destination</th>
              <th className="py-2">Fare (₹)</th>
              <th className="py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {routes.length>0 ? (
              routes.map((route, index)=> (
                <tr key={route._id} className="border-b border-gray-600">
                  <td className="py-2">{index+1}</td>
                  <td>{route.source}</td>
                  <td>{route.destination}</td>
                  <td>₹{route.fare}</td>
                  <td className="text-right space-x-2">
                    <button onClick={()=> handleEdit(route)} className="bg-yellow-500 cursor-pointer px-3 py-1 rounded hover:bg-yellow-600 text-sm">✏️ Edit</button>
                    <button onClick={()=> handleDeleteRoutes(route._id)} className="bg-red-600 cursor-pointer px-3 py-1 rounded hover:bg-red-700 text-sm">🗑 Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5" className="text-center py-4">
                  No routes found
                </td></tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default ManageRoutesMain;
