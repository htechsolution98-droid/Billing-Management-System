import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCircle,
  Package,
  ShoppingCart,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Crown,
  UserCog,
} from "lucide-react";

const Sidebar = ({
  user,
  onLogout,
  isCollapsed,
  setIsCollapsed,
  themeColors,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/superadmin-dashboard",
    },
    {
      id: "distributors",
      label: "Manage Distributors",
      icon: Users,
      path: "/distributor-table",
    },
    { id: "nusers", label: "Manage Nusers", icon: UserCircle, path: "/nuser-table" },
    { id: "products", label: "All Products", icon: Package, path: "#products" },
    {
      id: "customers",
      label: "Manage Customers",
      icon: UserCog,
      path: "/customer-table",
    },
    // { id: "users", label: "User Management", icon: UserCog, path: "#users" },
    { id: "settings", label: "Settings", icon: Settings, path: "#settings" },
  ];

  const isActivePath = (path) => {
    if (path.startsWith("#")) return false;
    return location.pathname === path;
  };

  const handleNavClick = (item) => {
    if (item.path.startsWith("#")) {
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
          fixed inset-y-0 left-0 z-50 bg-white shadow-2xl
          transform transition-all duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          flex h-screen flex-col border-r border-gray-100 lg:sticky lg:top-0 lg:self-start
          ${isCollapsed ? "w-20" : "w-72"}
        `}
      >
        {/* Logo Section */}
        <div
          className={`flex h-24 items-center bg-gradient-to-r ${themeColors.primary} px-6`}
        >
          <div className="flex w-full items-center justify-between">
            <div
              className={`flex items-center gap-3 ${isCollapsed ? "justify-center w-full" : ""}`}
            >
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Crown className="w-6 h-6 text-white" />
              </div>
              {!isCollapsed && (
                <div>
                  <h2 className="text-xl font-bold text-white">SuperAdmin</h2>
                  <p className="text-white/70 text-xs">Billing System</p>
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

        {/* User Info Card */}
        {!isCollapsed && (
          <div
            className={`mx-4 mt-4 p-4 bg-gradient-to-r ${themeColors.primaryLight} rounded-2xl border ${themeColors.primaryBorder}`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 bg-gradient-to-br ${themeColors.activeBg} text-white flex items-center justify-center rounded-xl font-bold text-lg shadow-lg`}
              >
                {user.name ? user.name.charAt(0).toUpperCase() : "S"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 truncate">
                  {user.name || "SuperAdmin"}
                </p>
                <p
                  className={`text-xs ${themeColors.primaryText} font-medium capitalize`}
                >
                  {user.role || "SuperAdmin"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Collapse Toggle (Desktop) */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex mx-4 mt-4 p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors justify-center"
        >
          <ChevronRight
            className={`w-5 h-5 text-gray-600 transition-transform ${isCollapsed ? "" : "rotate-180"}`}
          />
        </button>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {!isCollapsed && (
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-3 mt-2">
              Main Menu
            </p>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActivePath(item.path);
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${isCollapsed ? "justify-center" : ""}
                  ${
                    isActive
                      ? `bg-gradient-to-r ${themeColors.activeBg} text-white shadow-lg`
                      : `text-gray-600 ${themeColors.hoverBg} ${themeColors.hoverText}`
                  }
                `}
                title={isCollapsed ? item.label : ""}
              >
                <Icon
                  className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-400"}`}
                />
                {!isCollapsed && (
                  <>
                    <span className="font-medium flex-1 text-left">
                      {item.label}
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-300"}`}
                    />
                  </>
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout Section */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={onLogout}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors group ${isCollapsed ? "justify-center" : ""}`}
            title={isCollapsed ? "Logout" : ""}
          >
            <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
            {!isCollapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
