import HeaderAdmin from "../utilityAdmin/headerAdmin";
import ViewUsersMain from "../utilityAdmin/viewUsersMain";

function ViewUser() {
return(
<div className="bg-slate-900 text-white h-screen min-h-screen overflow-x-hidden px-10 py-6 flex flex-col">
        <HeaderAdmin></HeaderAdmin>
        <ViewUsersMain></ViewUsersMain>
       </div>
    )
}

export default ViewUser;