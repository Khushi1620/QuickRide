import HeaderAdmin from "../utilityAdmin/headerAdmin";
import TripAnalysisMain from "../utilityAdmin/tripAnalysisMain";

function TripAnalytics() {
    return (
<div className="bg-slate-900 text-white h-screen min-h-screen overflow-x-hidden px-10 py-6 flex flex-col">
        <HeaderAdmin></HeaderAdmin>
        <TripAnalysisMain></TripAnalysisMain>
       </div>
    )
}

export default TripAnalytics;