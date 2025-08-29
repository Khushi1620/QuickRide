import HeaderDashboard from "../utilities/headerDashboard";
import UpcomingTripsMain from "../utilities/upcomingTripsMain";

function UpcomingTrips() {
    return(
        <div className="bg-slate-900 text-white h-screen min-h-screen overflow-x-hidden px-10 py-6 flex flex-col">
        <HeaderDashboard></HeaderDashboard>
         <UpcomingTripsMain></UpcomingTripsMain>
       </div>
    )
}

export default UpcomingTrips;