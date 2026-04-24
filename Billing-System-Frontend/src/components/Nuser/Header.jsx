import { Bell, Search, LogOut } from "lucide-react";

const Header = ({ user, onLogout, currentTime }) => {
  return (
    <header className="sticky top-0 z-30 h-24 border-b border-gray-100 bg-white/80 px-6 shadow-sm backdrop-blur-md">
      <div className="flex h-full items-center justify-between">
        {/* Left: Title & Date */}
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

        {/* Right: Search, Notifications, Profile */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-sm w-40 lg:w-48"
            />
          </div>

          {/* Notification Bell */}
          <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile Section */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="text-right hidden sm:block">
              <p className="font-semibold text-gray-800 text-sm">
                {user.name || "Nuser"}
              </p>
              <p className="text-xs text-violet-600 capitalize">
                {user.role || "Nuser"}
              </p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 text-white flex items-center justify-center rounded-xl font-bold shadow-lg shadow-violet-500/30">
              {user.name ? user.name.charAt(0).toUpperCase() : "N"}
            </div>
            
            {/* Logout Button (Desktop) */}
            <button
              onClick={onLogout}
              className="hidden md:flex items-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
