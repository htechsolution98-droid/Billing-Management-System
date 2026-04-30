import { useState, useRef, useEffect } from "react";
import { Bell, LogOut } from "lucide-react";

const Header = ({ user, onLogout, currentTime }) => {
  // ✅ CORRECT PLACE (HERE)
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 h-24 border-b border-gray-100 bg-white/80 px-6 shadow-sm backdrop-blur-md">
      <div className="flex h-full items-center justify-between">
        {/* Left */}
        <div className="ml-12 lg:ml-0">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-sm text-gray-500">
            {currentTime.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-xl hover:bg-gray-100">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile */}
          <div
            className="relative flex items-center gap-3 pl-4 border-l border-gray-200"
            ref={dropdownRef}
          >
            <div
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="text-right hidden sm:block">
                <p className="font-semibold text-gray-800 text-sm">
                  {user.name || "User"}
                </p>
                <p className="text-xs text-violet-600 capitalize">
                  {user.role || "User"}
                </p>
              </div>

              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 text-white flex items-center justify-center rounded-xl font-bold">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
            </div>

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 top-14 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 z-[9999] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* User Info */}
                <div className="px-5 py-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white">
                  <p className="font-semibold text-sm">{user.name || "User"}</p>
                  <p className="text-xs opacity-80 capitalize">
                    {user.role || "User"}
                  </p>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  {/* Profile Option */}
                  <button className="w-full flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-gray-50 transition">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                      👤
                    </div>
                    <span className="text-sm font-medium">My Profile</span>
                  </button>

                  {/* Settings Option */}
                  <button className="w-full flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-gray-50 transition">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                      ⚙️
                    </div>
                    <span className="text-sm font-medium">Settings</span>
                  </button>

                  {/* Divider */}
                  <div className="my-2 border-t"></div>

                  {/* Logout */}
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-5 py-3 text-red-600 hover:bg-red-50 transition"
                  >
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-100">
                      <LogOut className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
