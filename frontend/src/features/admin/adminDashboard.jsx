import AdminDashboardMain from "../utilityAdmin/AdminDashboardMain";
import HeaderAdmin from "../utilityAdmin/headerAdmin";

function AdminDashboard() {
    return (
   <div className="bg-slate-900 text-white h-screen min-h-screen overflow-x-hidden px-10 py-6 flex flex-col">
        <HeaderAdmin></HeaderAdmin>
        <AdminDashboardMain></AdminDashboardMain>
       </div>
    )
}

export default AdminDashboard;