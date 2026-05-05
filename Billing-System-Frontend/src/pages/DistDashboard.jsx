import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

// Import Components
import Sidebar from "../components/Distributor/Sidebar";
import Header from "../components/Distributor/Header";
import StatCard from "../components/Distributor/StatCard";
import RecentTable from "../components/Distributor/RecentTable";
import ActivityFeed from "../components/Distributor/ActivityFeed";
import WelcomeBanner from "../components/Distributor/WelcomeBanner";
import LogoutModal from "../components/Distributor/LogoutModal";
import DistNuserTable from "../components/Distributor/DistNuserTable";

// Icons for StatCards
import { Users, Package, ShoppingCart, ClipboardList } from "lucide-react";

const DistributorDashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // User state
  const [user, setUser] = useState({
    _id: "",
    name: "",
    role: "",
    email: "",
    mobile: "",
    firmName: "",
  });

  // Dashboard data state
  const [dashboardData, setDashboardData] = useState({
    totaluser: 0,
    totaproduct: 0,
    totalcustomer: 0,
    totalorder: 0,
  });



  // Fetch Dashboard Data
  const getDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to fetch from API
      try {
        const res = await axiosInstance.get("/distributorapi/distdashget");
        if (res.data && res.data.data) {
          setDashboardData(res.data.data);
        }
      } catch (apiError) {
        console.log("API not available, using default data");
        // Use default/example data if API fails
        setDashboardData({
          totaluser: 10,
          totaproduct: 120,
          totalcustomer: 80,
          totalorder: 45,
        });
      }

      // Get user from localStorage
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData) {
        setUser({
          _id: userData._id || userData.id || "",
          name: userData.name || userData.firmName || "Distributor",
          role: userData.role || "distributor",
          email: userData.email || "",
          mobile: userData.mobile || "",
          firmName: userData.firmName || userData.name || "",
        });
      }

      setLoading(false);
    } catch (error) {
      console.error("Error loading dashboard:", error);
      setError("Failed to load dashboard data");
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();

    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

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

  // Stat card configurations
  const statCards = [
    {
      title: "Total Nusers",
      value: dashboardData.totaluser,
      icon: Users,
      trend: "up",
      trendValue: "+12%",
      gradientFrom: "from-blue-500",
      gradientTo: "to-blue-600",
      iconBgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Products",
      value: dashboardData.totaproduct,
      icon: Package,
      trend: "up",
      trendValue: "+8%",
      gradientFrom: "from-emerald-500",
      gradientTo: "to-emerald-600",
      iconBgColor: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      title: "Total Customers",
      value: dashboardData.totalcustomer,
      icon: ShoppingCart,
      trend: "up",
      trendValue: "+24%",
      gradientFrom: "from-purple-500",
      gradientTo: "to-purple-600",
      iconBgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Total Orders",
      value: dashboardData.totalorder || 45,
      icon: ClipboardList,
      trend: "stable",
      trendValue: "Stable",
      gradientFrom: "from-orange-500",
      gradientTo: "to-orange-600",
      iconBgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 to-emerald-50">
      {/* Sidebar */}
      <Sidebar 
        user={user} 
        onLogout={handleLogoutClick}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      {/* Main Content */}
      <div className="flex-1 flex min-h-0 flex-col overflow-hidden">
        {/* Header */}
        <Header 
          user={user} 
          onLogout={handleLogoutClick} 
          currentTime={currentTime} 
        />

        {/* Dashboard Content */}
        <main className="flex-1 min-h-0 overflow-y-auto p-4 lg:p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚠️</span>
                </div>
                <p className="text-red-600 font-semibold">{error}</p>
                <button
                  onClick={getDashboardData}
                  className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Welcome Banner */}
              <WelcomeBanner 
                userName={user.name?.split(" ")[0]} 
                firmName={user.firmName} 
              />

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {statCards.map((card, index) => (
                  <StatCard key={index} {...card} />
                ))}
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

export default DistributorDashboard;
