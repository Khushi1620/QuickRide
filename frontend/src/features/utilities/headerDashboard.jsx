import { useState } from "react";
import { Link } from "react-router-dom";
import notification from "../../assets/notification.svg";
import user from "../../assets/user.svg";
import dashboard from "../../assets/dashboard.svg";
import upcomingTrips from "../../assets/upcomingTrips.svg";
import booking from "../../assets/bookTrip.svg";
import tripHistory from "../../assets/tripHistory.svg";
import wallet from "../../assets/wallet.svg";
import viewProfile from "../../assets/viewProfile.svg";

function HeaderDashboard() {
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { icon: dashboard, label: "Dashboard", path: "/user/dashboard" },
    { icon: booking, label: "Book a new trip", path: "/user/tripBooking" },
    { icon: upcomingTrips, label: "Upcoming trips", path: "/user/upcomingTrips" },
    { icon: tripHistory, label: "Trip history", path: "/user/tripHistory" },
    { icon: wallet, label: "Wallet balance", path: "/user/wallet" },
    { icon: viewProfile, label: "View profile", path: "/user/profile" },
  ];

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
            <Link
              to={item.path}
              key={index}
              className="flex items-center gap-2 hover:text-indigo-600"
            >
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
            <Link
              to={item.path}
              key={index}
              className="flex items-center gap-2 hover:text-indigo-600"
              onClick={() => setMenuOpen(false)} // close menu after click
            >
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
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md">
              🚪 Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default HeaderDashboard;