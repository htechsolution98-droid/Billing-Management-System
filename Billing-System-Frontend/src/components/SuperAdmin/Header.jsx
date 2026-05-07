import { useState, useRef, useEffect } from "react";
import { Bell, Search, LogOut, Calendar, Clock, User, Settings, ChevronDown } from "lucide-react";

const Header = ({ user, onLogout, currentTime, themeColors, children }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <header className="sticky top-0 z-30 h-24 border-b border-gray-100 bg-white/80 px-6 shadow-sm backdrop-blur-md">
      <div className="flex h-full items-center justify-between">
        {/* Left: Page Title & Date/Time */}
        <div className="ml-12 lg:ml-0">
          <h1 className="text-2xl font-bold text-gray-800">
            SuperAdmin Dashboard
          </h1>
          <div className="flex items-center gap-4 mt-1">
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              {formatDate(currentTime)}
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              {formatTime(currentTime)}
            </div>
          </div>
        </div>

        {/* Right: Search, Notifications, Profile */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle (if provided) */}
          {children}

          {/* Notification Bell */}
          <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile Section */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 pl-4 border-l border-gray-200 hover:bg-gray-50/50 p-2 rounded-xl transition-all"
            >
              <div className="text-right hidden sm:block">
                <p className="font-semibold text-gray-800 text-sm leading-tight">
                  {user.name || "SuperAdmin"}
                </p>
                <p
                  className={`text-[10px] ${themeColors?.primaryText || "text-emerald-600"} font-bold uppercase tracking-wider mt-0.5`}
                >
                  {user.role || "SuperAdmin"}
                </p>
              </div>
              <div
                className={`w-10 h-10 bg-gradient-to-br ${themeColors?.activeBg || "from-emerald-500 to-teal-600"} text-white flex items-center justify-center rounded-xl font-bold shadow-lg group-hover:scale-105 transition-transform`}
              >
                {user.name ? user.name.charAt(0).toUpperCase() : "S"}
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in duration-200">
                <div className="px-4 py-3 border-b border-gray-50">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Account</p>
                </div>
                
                <button 
                  onClick={() => {
                    console.log("My Profile clicked");
                    setIsProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors group"
                >
                  <div className={`p-1.5 rounded-lg bg-gray-50 group-hover:bg-white group-hover:shadow-sm transition-all`}>
                    <User className="w-4 h-4" />
                  </div>
                  <span className="font-medium">My Profile</span>
                </button>

                <button 
                  onClick={() => {
                    console.log("Setting clicked");
                    setIsProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors group"
                >
                  <div className={`p-1.5 rounded-lg bg-gray-50 group-hover:bg-white group-hover:shadow-sm transition-all`}>
                    <Settings className="w-4 h-4" />
                  </div>
                  <span className="font-medium">Setting</span>
                </button>

                <div className="h-px bg-gray-50 my-1 mx-2"></div>

                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    onLogout();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors group"
                >
                  <div className={`p-1.5 rounded-lg bg-red-50 group-hover:bg-white group-hover:shadow-sm transition-all`}>
                    <LogOut className="w-4 h-4" />
                  </div>
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
