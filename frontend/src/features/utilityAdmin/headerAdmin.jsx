import notification from '../../assets/notification.svg';
import user from '../../assets/user.svg';
import dashboard from '../../assets/dashboard.svg';
import shuttles from '../../assets/shuttles.svg';
import routes from '../../assets/routes.svg';
import viewUsers from '../../assets/viewUsers.svg';
import wallet from '../../assets/wallet.svg';
import tripAnalysis from '../../assets/tripAnalysis.svg';
import viewProfile from '../../assets/viewProfile.svg';
import '../../ResponsiveCSS/responsive.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ✅ Import Link
import { logoutAdmin } from '../../services/authServices';

function HeaderAdmin() {
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { icon: dashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: tripAnalysis, label: "Trip Analysis", path: "/admin/tripAnalytics" },
    { icon: routes, label: "Manage Routes", path: "/admin/manageRoutes" },
    { icon: shuttles, label: "Manage Shuttles", path: "/admin/manageShuttles" },
    { icon: viewUsers, label: "View Users", path: "/admin/viewUser" },
    { icon: wallet, label: "Recharge Wallet", path: "/admin/wallet" },
    { icon: viewProfile, label: "View Profile", path: "/admin/profile" },
  ];

  const handleLogout = async()=> {
    try {
      await logoutAdmin();
      alert("Logged out successfully...!!!");
      navigate("/");
    } catch(error) {
      console.log("Error in handle logout admin is: ", error.message);
    }
  }

  return (
    <header className="border-b-2 border-indigo-600 p-4 bg-white dark:bg-gray-900 shadow-md">
      <div className="flex justify-between items-center">

        {/* Hamburger icon for mobile */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="text-2xl">{menuOpen ? "✖️" : "☰"}</span>
        </button>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex gap-6 items-center">
          {menuItems.map((item, index) => (
            <Link to={item.path} key={index} className="flex items-center gap-2 hover:text-indigo-600">
              <img src={item.icon} className="h-5 w-5 invert" alt={item.label} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User Controls */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={() => setIsDark(!isDark)}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700"
          >
            {isDark ? "🌞" : "🌙"}
          </button>
          <img src={notification} className="h-6 w-6 invert" alt="Notifications" />
          <img src={user} className="h-6 w-6 invert" alt="User" />
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md">
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden mt-3 space-y-2">
          {menuItems.map((item, index) => (
            <Link to={item.path} key={index} className="flex items-center gap-2 hover:text-indigo-600">
              <img src={item.icon} className="h-5 w-5 invert" alt={item.label} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
          <div className="flex items-center gap-4 mt-3">
            <button
              onClick={() => setIsDark(!isDark)}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700"
            >
              {isDark ? "🌞" : "🌙"}
            </button>
            <img src={notification} className="h-6 w-6 invert" alt="Notifications" />
            <img src={user} className="h-6 w-6 invert" alt="User" />
            <button onClick={handleLogout} className="bg-red-600 cursor-pointer hover:bg-red-700 text-white px-4 py-1 rounded-md">
              🚪 Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default HeaderAdmin;
