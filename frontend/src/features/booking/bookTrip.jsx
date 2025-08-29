import BookMyTripMain from "../utilities/bookMyTripMain";
import HeaderDashboard from "../utilities/headerDashboard";

function BookTrip () {
    return (
       <div className="bg-slate-900 text-white h-screen min-h-screen overflow-x-hidden px-10 py-6 flex flex-col">
        <HeaderDashboard></HeaderDashboard>
        <BookMyTripMain></BookMyTripMain>
       </div>
    )
}

export default BookTrip;