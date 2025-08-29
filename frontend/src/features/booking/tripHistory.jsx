import HeaderDashboard from "../utilities/headerDashboard";
import TripHistoryMain from "../utilities/tripHistoryMain";

function TripHistory () {
     return (
       <div className="bg-slate-900 text-white h-screen min-h-screen overflow-x-hidden px-10 py-6 flex flex-col">
         <HeaderDashboard></HeaderDashboard>
         <TripHistoryMain></TripHistoryMain>
       </div>
     )
}

export default TripHistory;