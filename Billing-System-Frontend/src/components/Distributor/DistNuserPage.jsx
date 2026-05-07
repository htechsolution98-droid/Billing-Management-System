import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import LogoutModal from "./LogoutModal";
import DistNuserTable from "./DistNuserTable";

const DistNuserPage = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // User state
  const [user, setUser] = useState({
    _id: "",
    name: "",
    role: "",
    email: "",
    mobile: "",
    firmName: "",
  });

  useEffect(() => {
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

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 to-emerald-50">
      {/* Sidebar */}
      <Sidebar 
        user={user} 
        onLogout={handleLogoutClick}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        onProfileClick={() => setIsProfileModalOpen(true)}
      />

      {/* Main Content */}
      <div className="flex-1 flex min-h-0 flex-col overflow-hidden">
        {/* Header */}
        {/* <Header 
          user={user} 
          onLogout={handleLogoutClick} 
          currentTime={currentTime} 
          isProfileOpen={isProfileModalOpen}
          setIsProfileOpen={setIsProfileModalOpen}
        /> */}
        <main className="flex-1 min-h-0 overflow-y-auto p-4 lg:p-6">
          <div className="space-y-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Manage Users</h1>
              <p className="text-sm text-gray-500">View and manage all users registered under your distributorship.</p>
            </div>
            
            {/* NUser Table Section */}
            {user._id && (
              <DistNuserTable distributorId={user._id} />
            )}
          </div>
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

export default DistNuserPage;
