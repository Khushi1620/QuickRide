import HeaderDashboard from "../utilities/headerDashboard";
import MainContent from "../utilities/mainContentUser";
import '../../ResponsiveCSS/responsive.css';

function UserDashboard() {
    return (
       <div className="bg-slate-900 text-white h-screen min-h-screen overflow-x-hidden px-10 py-6 flex flex-col">
        <HeaderDashboard title="User Dashboard"></HeaderDashboard>
         <MainContent></MainContent>
       </div>
    )
}

export default UserDashboard;