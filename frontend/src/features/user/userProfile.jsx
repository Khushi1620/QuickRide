import HeaderDashboard from "../utilities/headerDashboard";
import UserProfileMain from "../utilities/userProfileMain";

function UserProfile() {
    return (
        <div className="bg-slate-900 text-white h-screen min-h-screen overflow-x-hidden px-10 py-6 flex flex-col">
        <HeaderDashboard title="User Dashboard"></HeaderDashboard>
         <UserProfileMain></UserProfileMain>
       </div>
    )
}

export default UserProfile;