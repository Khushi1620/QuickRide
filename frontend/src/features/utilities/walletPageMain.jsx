import { useState, useEffect } from "react";
import { userProfile, rechargeUser } from "../../services/authServices";

function WalletPageMain() {

  const [wallet, setWallet] = useState(0);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [rechargeHistory, setRechargeHistory] = useState([]);

  useEffect(()=> {
    userProfile()
    .then((result)=> {
      const data = result?.data?.data || result.data;
      setWallet(data.wallet || 0);
      setRechargeHistory(data.rechargeHistory || []);
    })
    .catch((error)=> {
      console.log("Error in user profile in wallet page: ", error.message);
    });
  }, []);

  const handleRecharge = async ()=> {
    if (!amount || amount<0) {
      setMessage("Please enter a valid amount...!!!");
      return;
    }
    try {
      await rechargeUser({amount: Number(amount)});
      const date = new Date();
      setWallet((prev)=> prev + Number(amount));
      setRechargeHistory((prev)=> [
        {amount: Number(amount), date: date.toISOString()}, ...prev
      ]);
      setAmount("");
      setMessage("Wallet recharged successfully...!!!");
      setTimeout(() => setMessage(""), 4000);
    } catch(error) {
      console.log("Error in handle recharge is: ", error.message);
    }
  }

  return (
    <div className="main_container w-full px-4 sm:px-6 lg:px-28 xl:px-36 py-6 overflow-auto hide-scrollbar mx-auto">
      <h1 className="text-3xl font-semibold mb-6">💼 Wallet Dashboard</h1>

      <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6 text-white">
        <h2 className="text-2xl font-semibold">Current Balance:</h2>
        <p className="text-green-400 text-3xl mt-2">₹{wallet}</p>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6 text-white">
        <h2 className="text-xl font-semibold mb-4">💳 Recharge Wallet</h2>
        <form onSubmit={(e)=> e.preventDefault()} className="flex flex-col gap-4 max-w-sm">
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e)=> setAmount(e.target.value)}
            className="p-3 rounded bg-slate-100 text-black"
          />
          <button
          onClick={handleRecharge}
            type="button"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded"
          >
            Recharge
          </button>
          {message && <p className="text-sm text-yellow-400">{message}</p>}
        </form>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow-md text-white">
        <h2 className="text-xl font-semibold mb-4">📜 Recharge History</h2>
       <ul className="list-disc pl-5 space-y-2 text-gray-300">
          {rechargeHistory.length > 0 ? (
            rechargeHistory.map((log, idx) => (
              <li key={idx}>
                ₹{log.amount} recharged on{" "}
                {new Date(log.date).toLocaleDateString()} at{" "}
                {new Date(log.date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </li>
            ))
          ) : (
            <li>No recharge history found.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default WalletPageMain;
