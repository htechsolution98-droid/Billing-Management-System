import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  FileText,
  UserCircle,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Store,
} from "lucide-react";

const Sidebar = ({ user, onLogout, isCollapsed, setIsCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const displayName = user?.name || "Distributor";
  const firstName = displayName.trim().split(" ")[0] || "Distributor";
  const userInitial = firstName.charAt(0).toUpperCase();

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/distributor-dashboard",
    },
    { id: "nusers", label: "Manage Nusers", icon: Users, path: "/distributor-nusers" },
    {
      id: "products",
      label: "Manage Products",
      icon: Package,
      path: "#products",
    },
    {
      id: "customers",
      label: "Manage Customers",
      icon: ShoppingCart,
      path: "#customers",
    },
    { id: "reports", label: "Reports", icon: FileText, path: "#reports" },
    { id: "profile", label: "Profile", icon: UserCircle, path: "#profile" },
  ];

  const isActivePath = (path) => {
    if (path.startsWith("#")) return false;
    return location.pathname === path;
  };

  const handleNavClick = (item) => {
    if (item.path.startsWith("#")) {
      // For demo purposes - in real app, navigate to actual routes
      console.log(`Navigate to ${item.label}`);
      return;
    }
    navigate(item.path);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-30 lg:hidden p-2 bg-white rounded-xl shadow-lg"
      >
        <Menu className="w-6 h-6 text-gray-600" />
      </button>

      {/* Sidebar */}
      <aside
        className={` 
          fixed lg:static inset-y-0 left-0 z-50 bg-white shadow-2xl
          transform transition-all duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          flex flex-col border-r border-gray-100
          ${isCollapsed ? "w-20" : "w-72"}
        `}
      >
        {/* Logo Section */}
        <div className="p-6 bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-3 ${isCollapsed ? "justify-center w-full" : ""}`}>
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Store className="w-6 h-6 text-white" />
              </div>
              {!isCollapsed && (
                <div>
                  <h2 className="text-xl font-bold text-white">Distributor</h2>
                  <p className="text-emerald-100 text-xs">Panel</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-1 text-white/80 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Collapse Toggle (Desktop) */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex mx-4 mt-4 p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors justify-center"
        >
          <ChevronRight className={`w-5 h-5 text-gray-600 transition-transform ${isCollapsed ? "" : "rotate-180"}`} />
        </button>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1.5 custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActivePath(item.path);

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative
                  ${
                    isActive
                      ? "bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 font-semibold"
                      : "text-gray-600 hover:bg-gray-50 hover:text-emerald-600"
                  }
                  ${isCollapsed ? "justify-center" : ""}
                `}
                title={isCollapsed ? item.label : ""}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-r-full shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                )}
                
                <Icon
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isActive ? "scale-110" : "group-hover:scale-110"
                  }`}
                />
                
                {!isCollapsed && (
                  <span className="truncate whitespace-nowrap">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout Section */}
        <div className="p-4 border-t border-gray-100">
          <div
            className={`mb-3 flex items-center gap-3 rounded-xl bg-gray-50 px-3 py-2 ${
              isCollapsed ? "justify-center" : ""
            }`}
            title={isCollapsed ? firstName : ""}
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center font-bold shadow-sm">
              {userInitial}
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-400 truncate capitalize">
                  {user?.role || "Distributor"}
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
