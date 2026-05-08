import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, Edit, Trash2, Store, CheckCircle2, XCircle, X, Save, Loader2, ArrowLeft } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";
import Sidebar from "./Sidebar";
import Header from "./Header";
import LogoutModal from "./LogoutModal";
import { themes } from "./ThemeToggle";

const MasterShop = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentTheme] = useState(() => localStorage.getItem("superadmin-theme") || "emerald");
  const [user, setUser] = useState({ name: "", role: "", email: "" });

  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({ shopName: "", status: "active" });

  const themeColors = themes.find((t) => t.id === currentTheme)?.colors || themes[0].colors;

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) setUser(userData);

    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    fetchShops();
    return () => clearInterval(timer);
  }, []);

  const fetchShops = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/mastershopapi/get");
      setShops(res.data.data || res.data || []);
    } catch (error) {
      console.error("Fetch Error:", error);
      // Removed mock data for production safety, keeping empty state
      setShops([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (shop = null) => {
    if (shop) {
      setEditMode(true);
      setSelectedShop(shop);
      setFormData({ shopName: shop.shopName, status: shop.status });
    } else {
      setEditMode(false);
      setSelectedShop(null);
      setFormData({ shopName: "", status: "active" });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editMode) {
        await axiosInstance.put(`/mastershopapi/update/${selectedShop._id}`, formData);
        alert("Shop updated successfully! ✅");
      } else {
        await axiosInstance.post("/mastershopapi/add", formData);
        alert("Shop added successfully! ✅");
      }
      setModalOpen(false);
      fetchShops();
    } catch (error) {
      console.error("Submit Error:", error);
      const errorMsg = error.response?.data?.message || "Failed to save shop. ❌";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this shop?")) {
      try {
        await axiosInstance.delete(`/mastershopapi/delete/${id}`);
        alert("Shop deleted successfully! ✅");
        fetchShops();
      } catch (error) {
        console.error("Delete Error:", error);
        alert("Failed to delete shop. ❌");
      }
    }
  };

  const filteredShops = shops.filter((shop) =>
    shop.shopName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`flex h-screen overflow-hidden bg-gradient-to-br ${themeColors.gradientBg}`}>
      <Sidebar
        user={user}
        onLogout={() => setShowLogoutModal(true)}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        themeColors={themeColors}
      />

      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <Header 
          user={user} 
          onLogout={() => setShowLogoutModal(true)} 
          currentTime={currentTime} 
          themeColors={themeColors} 
        />

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => navigate(-1)}
                  className="p-2.5 rounded-xl bg-white shadow-sm border border-gray-100 text-gray-500 hover:text-gray-700 transition-all"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Master Shops</h1>
                  <p className="text-sm text-gray-500">Configure your system shop branches</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search shops..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-black/5 outline-none w-full sm:w-64 transition-all"
                  />
                </div>
                <button
                  onClick={() => handleOpenModal()}
                  className={`flex items-center gap-2 bg-gradient-to-r ${themeColors.activeBg} text-white px-4 py-2.5 rounded-xl shadow-lg transition-all font-bold text-sm`}
                >
                  <Plus className="w-4 h-4" />
                  Add Shop
                </button>
              </div>
            </div>

            {/* Compact Table */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider w-16">ID</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">Shop Details</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-right text-xs font-bold text-black uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {loading ? (
                      [1, 2, 3].map((i) => (
                        <tr key={i} className="animate-pulse">
                          <td colSpan="4" className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-full"></div></td>
                        </tr>
                      ))
                    ) : filteredShops.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="px-6 py-12 text-center text-gray-400 italic">No shops found.</td>
                      </tr>
                    ) : (
                      filteredShops.map((shop, index) => (
                        <tr key={shop._id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-3 text-sm font-bold text-black">#{index + 1}</td>
                          <td className="px-6 py-3">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center ${themeColors.primaryText}`}>
                                <Store className="w-4 h-4" />
                              </div>
                              <span className="font-bold text-black text-sm">{shop.shopName}</span>
                            </div>
                          </td>
                          <td className="px-6 py-3">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                              shop.status === 'active' 
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                                : 'bg-red-50 text-red-700 border border-red-100'
                            }`}>
                              {shop.status === 'active' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                              {shop.status}
                            </span>
                          </td>
                          <td className="px-6 py-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleOpenModal(shop)}
                                className="p-2 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition-all border border-amber-100"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDelete(shop._id)}
                                className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all border border-red-100"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
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

      {/* Simplified Professional Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden">
            <div className={`bg-gradient-to-r ${themeColors.primary} px-6 py-6`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-white">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <Store className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">{editMode ? "Edit Shop" : "Add New Shop"}</h2>
                    <p className="text-white/70 text-xs">Branch Configuration</p>
                  </div>
                </div>
                <button onClick={() => setModalOpen(false)} className="text-white/80 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase px-1">Shop Name</label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={formData.shopName}
                  onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 outline-none transition-all font-bold text-black"
                  placeholder="Enter shop name..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase px-1">Status</label>
                <div className="flex gap-2">
                  {['active', 'inactive'].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setFormData({ ...formData, status: s })}
                      className={`flex-1 py-2.5 rounded-xl border-2 transition-all font-bold text-xs uppercase tracking-wider ${
                        formData.status === s
                          ? s === 'active' ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-red-50 border-red-500 text-red-700'
                          : 'border-gray-100 text-gray-400 bg-gray-50'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-600 font-bold rounded-xl text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r ${themeColors.activeBg} text-white font-bold rounded-xl shadow-lg text-sm`}
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {editMode ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <LogoutModal
        isOpen={showLogoutModal}
        userName={user.name}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }}
      />
    </div>
  );
};

export default MasterShop;
