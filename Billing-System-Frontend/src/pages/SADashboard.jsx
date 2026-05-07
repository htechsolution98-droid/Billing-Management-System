import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import {
  Users,
  UserCircle,
  ShoppingCart,
  Package,
  DollarSign,
  Receipt,
  ChevronRight,
} from "lucide-react";

// Import Components
import Sidebar from "../components/SuperAdmin/Sidebar";
import Header from "../components/SuperAdmin/Header";
import StatCard from "../components/SuperAdmin/StatCard";
// import SalesChart from "../components/SuperAdmin/SalesChart";
// import ActivityFeed from "../components/SuperAdmin/ActivityFeed";
import LogoutModal from "../components/SuperAdmin/LogoutModal";
import ThemeToggle, { themes } from "../components/SuperAdmin/ThemeToggle";

const SuperAdminDashboard = () => {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState({});
  const [recentDistributors, setRecentDistributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentTheme, setCurrentTheme] = useState(() => {
    // Load theme from localStorage or default to emerald
    return localStorage.getItem("superadmin-theme") || "emerald";
  });

  // User info state
  const [user, setUser] = useState({
    name: "",
    role: "",
    email: "",
  });


  const getStoredUser = () => {
    try {
      const rawUser = localStorage.getItem("user");
      return rawUser ? JSON.parse(rawUser) : null;
    } catch (error) {
      console.error("Invalid user data in localStorage", error);
      localStorage.removeItem("user");
      return null;
    }
  };

  // Sample data for tables
  // const [recentDistributors] = useState([
  //   { name: "Rohan Traders", firmName: "Rohan Enterprises", email: "rohan@example.com", phone: "98765 43210", status: "Active", createdDate: "2026-01-15" },
  //   { name: "Amit Distributors", firmName: "Amit Trading Co.", email: "amit@example.com", phone: "98766 54321", status: "Active", createdDate: "2026-01-12" },
  //   { name: "Priya Suppliers", firmName: "Priya Goods", email: "priya@example.com", phone: "98767 65432", status: "Pending", createdDate: "2026-01-10" },
  //   { name: "Suresh Wholesale", firmName: "Suresh Mart", email: "suresh@example.com", phone: "98768 76543", status: "Active", createdDate: "2026-01-08" },
  // ]);

  // const [recentNusers] = useState([
  //   { name: "Rajesh Kumar", distributorName: "Rohan Traders", email: "rajesh@example.com", phone: "98765 11111", status: "Active" },
  //   { name: "Priya Sharma", distributorName: "Amit Distributors", email: "priya.s@example.com", phone: "98766 22222", status: "Active" },
  //   { name: "Amit Patel", distributorName: "Rohan Traders", email: "amit.p@example.com", phone: "98767 33333", status: "Pending" },
  //   { name: "Sneha Gupta", distributorName: "Priya Suppliers", email: "sneha@example.com", phone: "98768 44444", status: "Active" },
  // ]);

  // Fetch Dashboard Data
  useEffect(() => {
    fetchDashboard();

    // Get user from localStorage
    const userData = getStoredUser();
    if (userData) {
      setUser(userData);
    }

    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Save theme to localStorage when changed
  useEffect(() => {
    localStorage.setItem("superadmin-theme", currentTheme);
  }, [currentTheme]);

  // Get current theme colors
  const themeColors = themes.find((t) => t.id === currentTheme)?.colors || themes[0].colors;

  const fetchDashboard = async () => {
    try {
      const [dashRes, distRes] = await Promise.all([
        axiosInstance.get("/registerapi/sadash"),
        axiosInstance.get("/distributorapi/latest-users")
      ]);
      
      setDashboardData(dashRes.data?.data || {});
      setRecentDistributors(distRes.data.latest || []);
      setLoading(false);
    } catch (error) {
        console.log(error);
      setDashboardData({
        totalDistributor: 0,
        totalNuser: 0,
        totalCustomer: 0,
        totalProduct: 0,
        totalBills: 0,
        totalRevenue: 0,
      });
      setRecentDistributors([]);
      setLoading(false);
    }
  };

  // Logout handlers
  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setShowLogoutModal(false);
    navigate("/login");
  };

  // Handle theme change
  const handleThemeChange = (themeId) => {
    setCurrentTheme(themeId);
  };

  // Stat cards configuration
  const statCards = [
    {
      title: "Total Distributors",
      value: dashboardData.totalDistributor || 0,
      icon: Users,
      trend: "up",
      trendValue: "+12%",
      color: "blue",
    },
    {
      title: "Total Nusers",
      value: dashboardData.totalNuser || 0,
      icon: UserCircle,
      trend: "up",
      trendValue: "+8%",
      color: currentTheme === "emerald" ? "emerald" : currentTheme,
    },
    {
      title: "Total Products",
      value: dashboardData.totalProduct || 0,
      icon: Package,
      trend: "up",
      trendValue: "+15%",
      color: "purple",
    },
    {
      title: "Total Customers",
      value: dashboardData.totalCustomer || 0,
      icon: ShoppingCart,
      trend: "up",
      trendValue: "+24%",
      color: "orange",
    },
    {
      title: "Total Bills Generated",
      value: dashboardData.totalBills || 892,
      icon: Receipt,
      trend: "up",
      trendValue: "+18%",
      color: "pink",
    },
    {
      title: "Total Revenue",
      value: `₹${(dashboardData.totalRevenue || 125000).toLocaleString()}`,
      icon: DollarSign,
      trend: "up",
      trendValue: "+22%",
      color: "cyan",
    },
  ];

  return (
    <div className={`flex h-screen overflow-hidden bg-gradient-to-br ${themeColors.gradientBg}`}>
      {/* Sidebar */}
      <Sidebar 
        user={user} 
        onLogout={handleLogoutClick} 
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        themeColors={themeColors}
      />

      {/* Main Content */}
      <div className="flex-1 flex min-h-0 flex-col overflow-hidden">
        {/* Header */}
        <Header 
          user={user} 
          onLogout={handleLogoutClick} 
          currentTime={currentTime}
          themeColors={themeColors}
        >
          <ThemeToggle currentTheme={currentTheme} onThemeChange={handleThemeChange} />
        </Header>

        {/* Dashboard Content */}
        <main className="flex-1 min-h-0 overflow-y-auto p-4 lg:p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${themeColors.spinner}`}></div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Stats Cards - 6 cards in 2 rows */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6">
                {statCards.map((card, index) => (
                  <StatCard key={index} {...card} />
                ))}
              </div>

              <div className="space-y-6">
                {/* Latest Distributors Table - FULL WIDTH */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-xl">
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-800">Latest Distributors</h3>
                    </div>
                    <button 
                      onClick={() => navigate("/distributor-table")}
                      className={`text-sm font-bold ${themeColors.primaryText} hover:underline flex items-center gap-1`}
                    >
                      View All
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50/50">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider w-16">ID</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">Distributor</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">Firm Name</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">Email</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">Location</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {recentDistributors.length === 0 ? (
                          <tr>
                            <td colSpan="5" className="px-6 py-8 text-center text-gray-400 text-sm italic">
                              No distributors registered yet.
                            </td>
                          </tr>
                        ) : (
                          recentDistributors.map((dist, index) => (
                            <tr key={dist._id} className="hover:bg-gray-50/50 transition-colors">
                              <td className="px-6 py-4 text-sm font-bold text-black">
                                #{index + 1}
                              </td>
                              <td className="px-6 py-4">
                                <span className="font-medium text-black text-sm">{dist.name}</span>
                              </td>
                              <td className="px-6 py-4 text-sm text-black font-medium">{dist.firmName}</td>
                              <td className="px-6 py-4 text-sm text-black font-medium">{dist.email}</td>
                              <td className="px-6 py-4 text-sm text-black font-medium">{dist.area}, {dist.district}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  <div className="xl:col-span-2 space-y-6">
                    {/* <SalesChart /> */}
                  </div>

                  {/* <div className="space-y-6">
                    <ActivityFeed />
                  </div> */}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        userName={user.name}
        onCancel={handleCancelLogout}
        onConfirm={handleConfirmLogout}
      />

    </div>
  );
};

export default SuperAdminDashboard;
