import AdminProfileMain from "../utilityAdmin/adminProfileMain";
import HeaderAdmin from "../utilityAdmin/headerAdmin";

function AdminProfile() {
return(
<div className="bg-slate-900 text-white h-screen min-h-screen overflow-x-hidden px-10 py-6 flex flex-col">
        <HeaderAdmin></HeaderAdmin>
        <AdminProfileMain></AdminProfileMain>
       </div>
    )
}

export default AdminProfile;