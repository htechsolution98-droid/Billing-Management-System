import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Users, 
  ArrowLeft, 
  Search, 
  Eye, 
  Mail, 
  Phone, 
  Building2,
  RefreshCw
} from "lucide-react";
import axiosInstance from "../../api/axiosInstance";
import Sidebar from "./Sidebar";
import Header from "./Header";
import LogoutModal from "./LogoutModal";
import { themes } from "./ThemeToggle";

const SADistributorUsersPage = () => {
  const { distributorId } = useParams();
  const navigate = useNavigate();
  const [nusers, setNusers] = useState([]);
  const [distributor, setDistributor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [user, setUser] = useState({ name: "", role: "", email: "" });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentTheme] = useState(() => localStorage.getItem("superadmin-theme") || "emerald");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) setUser(userData);

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleLogoutClick = () => setShowLogoutModal(true);
  const handleConfirmLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const themeColors = themes.find((t) => t.id === currentTheme)?.colors || themes[0].colors;

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch NUsers
      const usersRes = await axiosInstance.get(`/nuserapi/get?distributorId=${distributorId}`);
      setNusers(usersRes.data.data || []);

      // Fetch Distributor Info (optional, but good for header)
      // If there's no direct single fetch, we can find it in the list if we had it, 
      // but usually we want to fetch specific info. 
      // For now, we'll try to get it if available or just show the ID.
    } catch (error) {
      console.error("Failed to fetch distributor users:", error);
    } finally {
      setLoading(false);
    }
  }, [distributorId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredUsers = nusers.filter(user => 
    user.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.firmName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`flex h-screen overflow-hidden bg-gradient-to-br ${themeColors.gradientBg}`}>
      <Sidebar 
        user={user}
        onLogout={handleLogoutClick}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        themeColors={themeColors}
      />

      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <Header 
          user={user}
          onLogout={handleLogoutClick}
          currentTime={currentTime}
          themeColors={themeColors} 
        />

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => navigate(-1)}
                  className="p-2.5 rounded-xl bg-white shadow-sm border border-gray-100 text-gray-500 hover:text-gray-700 transition-all"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Distributor Users</h1>
                  <p className="text-sm text-gray-500">Managing users for distributor: <span className="font-semibold text-violet-600">{distributorId}</span></p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-violet-500/20 outline-none w-full sm:w-64 transition-all"
                  />
                </div>
                <button 
                  onClick={fetchData}
                  className="p-2.5 rounded-xl bg-white shadow-sm border border-gray-100 text-gray-500 hover:text-violet-600 transition-all"
                >
                  <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Content Section */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider w-16">ID</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">User Details</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">Business</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {loading ? (
                      [1, 2, 3, 4, 5].map((i) => (
                        <tr key={i} className="animate-pulse">
                          <td colSpan="5" className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-full"></div></td>
                        </tr>
                      ))
                    ) : filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center text-gray-400 italic">
                          No users found for this distributor.
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((user, index) => (
                        <tr key={user._id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4 text-sm font-bold text-black">#{index + 1}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center font-bold text-sm">
                                {user.fullName?.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="font-bold text-gray-800 text-sm">{user.fullName}</div>
                                <div className="text-xs text-gray-500">ID: {user._id?.slice(-6)}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                              <Building2 className="w-4 h-4 text-gray-400" />
                              {user.firmName}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-xs text-gray-600">
                                <Mail className="w-3.5 h-3.5 text-gray-400" />
                                {user.email}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-gray-600">
                                <Phone className="w-3.5 h-3.5 text-gray-400" />
                                {user.mobile}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => navigate(`/superadmin/nuser-customers/${user._id}`)}
                              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all border border-blue-100 text-xs font-bold"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              View Customers
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      <LogoutModal
        isOpen={showLogoutModal}
        userName={user.name}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
};

export default SADistributorUsersPage;
