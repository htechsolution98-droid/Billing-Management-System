import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

// Import Components
import Sidebar from "../components/Nuser/Sidebar";
import Header from "../components/Nuser/Header";
import StatCard from "../components/Nuser/StatCard";
// import ProfileCard from "../components/Nuser/ProfileCard";
// import QuickActions from "../components/Nuser/QuickActions";
import DataTable from "../components/Nuser/DataTable";
import WelcomeBanner from "../components/Nuser/WelcomeBanner";
import LogoutModal from "../components/Nuser/LogoutModal";
import CustomerSection from "../components/Nuser/CustomerSection";
import ProductForm from "../components/Nuser/ProductForm";
import CategoryForm from "../components/Nuser/CategoryForm";
import BrandForm from "../components/Nuser/BrandForm";

// Icons for StatCards and Tables
import { Tag, Package, Users, FolderOpen } from "lucide-react";

const NuserDashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal states for forms
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  const [isBrandFormOpen, setIsBrandFormOpen] = useState(false);

  // User state
  const [user, setUser] = useState({
    name: "",
    role: "",
    email: "",
    mobile: "",
    businessName: "",
  });

  // Dashboard data state
  const [dashboardData, setDashboardData] = useState({
    totalbrand: 0,
    totaproduct: 0,
    totalcustomer: 0,
    totalcategory: 0,
  });

  // Sample data for tables
  // const [brands] = useState([
  //   {
  //     name: "Tata",
  //     category: "Consumer Goods",
  //     products: 25,
  //     status: "Active",
  //   },
  //   { name: "Reliance", category: "Retail", products: 40, status: "Active" },
  //   { name: "ITC", category: "FMCG", products: 35, status: "Active" },
  //   { name: "HUL", category: "Household", products: 50, status: "Active" },
  // ]);

  // const [products] = useState([
  //   { name: "Basmati Rice", category: "Grocery", price: "₹80/kg", stock: 40 },
  //   { name: "Sunflower Oil", category: "Grocery", price: "₹140/l", stock: 25 },
  //   { name: "Wheat Flour", category: "Grocery", price: "₹45/kg", stock: 60 },
  //   { name: "Organic Sugar", category: "Grocery", price: "₹55/kg", stock: 35 },
  // ]);

  // const [customers] = useState([
  //   {
  //     name: "Rajesh Kumar",
  //     mobile: "98765 11111",
  //     city: "Mumbai",
  //     status: "Active",
  //   },
  //   {
  //     name: "Priya Sharma",
  //     mobile: "98766 22222",
  //     city: "Delhi",
  //     status: "Active",
  //   },
  //   {
  //     name: "Amit Patel",
  //     mobile: "98767 33333",
  //     city: "Ahmedabad",
  //     status: "Pending",
  //   },
  //   {
  //     name: "Sneha Gupta",
  //     mobile: "98768 44444",
  //     city: "Bangalore",
  //     status: "Active",
  //   },
  // ]);

  // const [categories] = useState([
  //   { name: "Grocery", items: 120, status: "Active" },
  //   { name: "Beverages", items: 45, status: "Active" },
  //   { name: "Snacks", items: 80, status: "Active" },
  //   { name: "Dairy", items: 35, status: "Active" },
  // ]);

  // Fetch Dashboard Data
  const getDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Try to fetch from API
      try {
        const res = await axiosInstance.get("/nuserapi/userdashget");
        if (res.data && res.data.data) {
          setDashboardData(res.data.data);
        }
      } catch (apiError) {
        console.log("API not available, using default data");
        // Use default/example data if API fails
        setDashboardData({
          totalbrand: 4,
          totaproduct: 4,
          totalcustomer: 1,
          totalcategory: 4,
        });
      }

      // Get user from localStorage
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData) {
        setUser({
          name: userData.name || "Nuser",
          role: userData.role || "nuser",
          email: userData.email || "",
          mobile: userData.mobile || "",
          businessName: userData.businessName || userData.name || "",
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
      title: "Total Brands",
      value: dashboardData.totalbrand,
      icon: Tag,
      trend: "up",
      trendValue: "+15%",
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
      icon: Users,
      trend: "up",
      trendValue: "+24%",
      gradientFrom: "from-purple-500",
      gradientTo: "to-purple-600",
      iconBgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Total Categories",
      value: dashboardData.totalcategory,
      icon: FolderOpen,
      trend: "stable",
      trendValue: "Stable",
      gradientFrom: "from-orange-500",
      gradientTo: "to-orange-600",
      iconBgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 to-violet-50">
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
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
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
                  className="mt-4 px-4 py-2 bg-violet-500 text-white rounded-xl hover:bg-violet-600 transition-colors"
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
                businessName={user.businessName}
              />

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {statCards.map((card, index) => (
                  <StatCard key={index} {...card} />
                ))}
              </div>

              {/*  Quick Actions */}
              {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1"> */}
                  {/* <ProfileCard user={user} /> */}
                {/* </div>
                <div className="lg:col-span-2">
                  <QuickActions
                    onAddBrand={() => setIsBrandFormOpen(true)}
                    onAddProduct={() => setIsProductFormOpen(true)}
                    onAddCustomer={() => {}}
                    onAddCategory={() => setIsCategoryFormOpen(true)}
                  />
                </div>
              </div> */}

              {/* Tables Section */}
              {/* <CustomexrSection /> */}
            </div>
          )}
        </main>
      </div>

      {/* Form Modals */}
      <ProductForm
        isOpen={isProductFormOpen}
        onClose={() => setIsProductFormOpen(false)}
        refreshData={() => console.log("Product created")}
      />

      <CategoryForm
        isOpen={isCategoryFormOpen}
        onClose={() => setIsCategoryFormOpen(false)}
        refreshData={() => console.log("Category created")}
      />

      <BrandForm
        isOpen={isBrandFormOpen}
        onClose={() => setIsBrandFormOpen(false)}
        refreshData={() => console.log("Brand created")}
      />

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

export default NuserDashboard;
