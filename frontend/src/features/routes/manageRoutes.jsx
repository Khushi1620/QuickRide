import HeaderAdmin from "../utilityAdmin/headerAdmin";
import ManageRoutesMain from "../utilityAdmin/manageRoutesMain";

function ManageRoutes() {
    return(
<div className="bg-slate-900 text-white h-screen min-h-screen overflow-x-hidden px-10 py-6 flex flex-col">
        <HeaderAdmin></HeaderAdmin>
        <ManageRoutesMain></ManageRoutesMain>
       </div>
    )
}

export default ManageRoutes;