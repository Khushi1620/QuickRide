import HeaderDashboard from "../utilities/headerDashboard";
import WalletPageMain from "../utilities/walletPageMain";

function WalletPage() {
    return (
       <div className="bg-slate-900 text-white h-screen min-h-screen overflow-x-hidden px-10 py-6 flex flex-col">
        <HeaderDashboard title="User Dashboard"></HeaderDashboard>
         <WalletPageMain></WalletPageMain>
       </div>
    )
}

export default WalletPage;