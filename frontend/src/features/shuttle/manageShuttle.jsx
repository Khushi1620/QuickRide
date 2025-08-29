import HeaderAdmin from "../utilityAdmin/headerAdmin";
import ManageShuttleMain from "../utilityAdmin/manageShuttleMain";

function ManageShuttle() {
return(
<div className="bg-slate-900 text-white h-screen min-h-screen overflow-x-hidden px-10 py-6 flex flex-col">
        <HeaderAdmin></HeaderAdmin>
        <ManageShuttleMain></ManageShuttleMain>
       </div>
    )
}

export default ManageShuttle;