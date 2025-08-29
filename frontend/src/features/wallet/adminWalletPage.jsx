import HeaderAdmin from "../utilityAdmin/headerAdmin";
import RechargeWalletMain from "../utilityAdmin/rechargeWalletMain";

function AdminWalletPage() {
return(
<div className="bg-slate-900 text-white h-screen min-h-screen overflow-x-hidden px-10 py-6 flex flex-col">
        <HeaderAdmin></HeaderAdmin>
        <RechargeWalletMain></RechargeWalletMain>
       </div>
    )
}

export default AdminWalletPage;