import { useState } from "react";
import { rechargeAdmin } from "../../services/authServices";

function RechargeWalletMain() {

 const [emailId, setEmailId] = useState("");
 const [amount, setAmount] = useState("");
 const [message, setMessage] = useState("");
 const [history, setHistory] = useState("");

 const handleRecharge = async ()=> {
   if (! emailId || ! amount) {
    alert("Required field missing...!!!");
    return;
   }
   try {
    const result = await rechargeAdmin({
      emailId,
      amount: Number(amount),
    });
    setMessage(result.data.message || "Wallet recharged successfully...!!!");
    setHistory([
      {
        emailId, 
        amount,
        date: new Date().toLocaleDateString(),
      },
      ...history,
    ]);
    setEmailId("");
    setAmount("");
   } catch(error) {
    console.log("Error in handle recharge: ", error.response?.data || error.message);
   }
 }

  return (
    <div className="main_container w-full px-4 sm:px-6 lg:px-28 xl:px-36 py-6 overflow-auto hide-scrollbar mx-auto text-white space-y-10">

      {/* Heading */}
      <h1 className="text-3xl font-bold">💸 Recharge User Wallet</h1>

      {/* Recharge Form */}
      <div className="bg-slate-800 p-6 rounded-xl shadow-md space-y-6 max-w-xl">
        <div>
          <label className="block text-sm mb-1 text-gray-300">📧 Enter User Email</label>
          <input
            type="email"
            value={emailId}
            onChange={(e)=> setEmailId(e.target.value)}
            placeholder="user@university.edu"
            className="w-full p-3 rounded-md bg-slate-100 text-black"
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-gray-300">💰 Amount to Recharge</label>
          <input
            type="number"
            value={amount}
            onChange={(e)=> setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full p-3 rounded-md bg-slate-100 text-black"
          />
        </div>

        <div className="text-right">
          <button onClick={handleRecharge} className="bg-green-600 cursor-pointer hover:bg-green-700 px-6 py-2 rounded-md text-white font-semibold transition-all">
            Recharge Wallet
          </button>
        </div>
      </div>

      {/* Example: Recharge History Table */}
      <div className="bg-slate-800 p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">📜 Recent Recharges</h2>
        <table className="w-full text-sm text-left text-gray-300">
          <thead>
            <tr className="text-indigo-300 border-b border-indigo-500">
              <th className="py-2">User</th>
              <th className="py-2">Email</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Date</th>
            </tr>
          </thead>
           <tbody>
  {history.length === 0 ? (
    <tr>
      <td colSpan="4" className="text-center py-4 text-gray-400">
        No recharges yet
      </td>
    </tr>
  ) : (
    history.map((recharge, index) => (
      <tr key={index} className="border-b border-gray-600">
        <td>{recharge.emailId.split("@")[0]}</td>
        <td>{recharge.emailId}</td>
        <td>₹{recharge.amount}</td>
        <td>{recharge.date}</td>
      </tr>
    ))
  )}
</tbody>

        </table>
      </div>

    </div>
  );
}

export default RechargeWalletMain;
