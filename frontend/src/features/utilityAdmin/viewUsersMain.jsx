import { useState, useEffect } from "react";
import { viewUsers } from "../../services/authServices";

function ViewUsersMain() {

 const [users, setUsers] = useState([]);

 useEffect(()=> {
  fetchUsers();
 }, []);

 const fetchUsers = async()=> {
  try {
    const result = await viewUsers();
    setUsers(result.data || []);
  } catch(error) {
    console.log("Error in fetch users: ", error.message);
  }
 }

  return (
    <div className="main_container w-full px-4 sm:px-6 lg:px-28 xl:px-36 py-6 overflow-auto hide-scrollbar mx-auto text-white space-y-8">

      {/* Heading */}
      <h1 className="text-3xl font-bold">👥 View Registered Users</h1>

      {/* User Table */}
      <div className="bg-slate-800 p-6 rounded-xl shadow-md overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-300 min-w-[600px]">
          <thead>
            <tr className="text-indigo-300 border-b border-indigo-400">
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Wallet</th>
              <th className="py-2 px-4">Role</th>
              <th className="py-2 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (users.map((user, index)=> (
              <tr key={user._id} className="border-b border-gray-600">
                <td className="py-2 px-4">{index+1}</td>
                <td className="py-2 px-4">{user.firstName}</td>
                <td className="py-2 px-4">{user.emailId}</td>
                <td className="py-2 px-4 text-green-400 font-semibold">
                    ₹{user.walletBalance}
                  </td>
                  <td className="py-2 px-4 text-indigo-300">{user.role}</td>
                  <td className="py-2 px-4 text-right">
                    <button className="bg-blue-600 cursor-pointer px-3 py-1 rounded hover:bg-blue-700 text-sm">
                      👁 View Trips
                    </button>
                  </td>
              </tr>
            ))) : (<tr>
                <td colSpan="6" className="text-center py-4 text-gray-400">
                  No users found...!!!
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default ViewUsersMain;
