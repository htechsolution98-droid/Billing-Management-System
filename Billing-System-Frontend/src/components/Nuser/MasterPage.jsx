import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tag, FolderOpen, Plus, Search, Loader2 } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";
import Sidebar from "./Sidebar";
import Header from "./Header";
import LogoutModal from "./LogoutModal";
import CommonTable from "./CommonTable";
import CommonModalForm from "./CommonModalForm";

const MasterPage = () => {
  const navigate = useNavigate();

  // Tab state: "brand" | "category"
  const [activeTab, setActiveTab] = useState("category");

  // Data states
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Search
  const [searchQuery, setSearchQuery] = useState("");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  // Dashboard states
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [user, setUser] = useState({
    name: "",
    role: "",
    email: "",
    mobile: "",
    businessName: "",
  });

  // Fetch user data
  useEffect(() => {
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

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Fetch brands
  const fetchBrands = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/barndapi/get");
      const data = res.data?.data || res.data || [];
      // Normalize brand data to have a `name` field
      const normalized = data.map((b) => ({
        ...b,
        name: b.brandName || b.name || "Unnamed",
      }));
      setBrands(normalized);
    } catch (error) {
      console.error("Fetch brands error:", error);
      // Sample data fallback
      // setBrands([
      //   {
      //     _id: "b1",
      //     brandName: "India Gate",
      //     name: "India Gate",
      //     status: "active",
      //   },
      //   { _id: "b2", brandName: "Fortune", name: "Fortune", status: "active" },
      //   {
      //     _id: "b3",
      //     brandName: "Aashirvaad",
      //     name: "Aashirvaad",
      //     status: "inactive",
      //   },
      // ]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/cetegoryapi/get");
      const data = res.data?.data || res.data || [];
      // Normalize category data to have a `name` field
      const normalized = data.map((c) => ({
        ...c,
        name: c.categoryName || c.name || "Unnamed",
      }));
      setCategories(normalized);
    } catch (error) {
      console.error("Fetch categories error:", error);
      // Sample data fallback
      // setCategories([
      //   {
      //     _id: "c1",
      //     categoryName: "Grocery",
      //     name: "Grocery",
      //     status: "active",
      //   },
      //   {
      //     _id: "c2",
      //     categoryName: "Beverages",
      //     name: "Beverages",
      //     status: "active",
      //   },
      //   {
      //     _id: "c3",
      //     categoryName: "Snacks",
      //     name: "Snacks",
      //     status: "inactive",
      //   },
      // ]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data based on active tab
  useEffect(() => {
    fetchBrands();
    fetchCategories();
    setSearchQuery("");
  }, [activeTab]);

  // Filter data
  const getFilteredData = () => {
    let data = [];
    if (activeTab === "brand") {
      data = brands.map((b) => ({
        ...b,
        categoryName: b.categoryId?.categoryName || b.categoryId?.name || "N/A",
      }));
    } else {
      data = categories.map((cat) => {
        const catBrands = brands
          .filter(
            (b) =>
              b.categoryId?._id === cat._id || b.categoryId === cat._id
          )
          .map((b) => b.brandName || b.name);
        return {
          ...cat,
          brandNames: catBrands.length > 0 ? catBrands : ["None"],
        };
      });
    }

    if (!searchQuery.trim()) return data;
    return data.filter((item) =>
      item.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Add new
  const handleAddNew = () => {
    setEditMode(false);
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  // Edit
  const handleEdit = (item) => {
    setEditMode(true);
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // Brand and Category Delete api =====================================================
  const handleDelete = async (id) => {
    if (!window.confirm(`Are you sure you want to delete this ${activeTab}?`))
      return;

    const endpoint =
      activeTab === "brand"
        ? `/barndapi/branddelete/${id}`
        : `/cetegoryapi/categorydelete/${id}`;

    try {
      await axiosInstance.delete(endpoint);
      if (activeTab === "brand") fetchBrands();
      else fetchCategories();
    } catch (error) {
      console.error("Delete error:", error);
      alert(`Error deleting ${activeTab}`);
    }
  };

  // Submit (Create / Update) category brand edit api ============================================================
  const handleSubmit = async (formData) => {
    setModalLoading(true);

    try {
      if (activeTab === "brand") {
        const payload = {
          brandName: formData.name,
          status: formData.status,
          categoryId: formData.categoryId || undefined,
        };

        if (editMode && selectedItem) {
          await axiosInstance.put(
            `/barndapi/brandedit/${selectedItem._id}`,
            payload,
          );
        } else {
          await axiosInstance.post("/barndapi/create", payload);
        }
        fetchBrands();
      } else {
        const payload = {
          categoryName: formData.name,
          status: formData.status,
        };

        if (editMode && selectedItem) {
          await axiosInstance.put(
            `/cetegoryapi/categoryedit/${selectedItem._id}`,
            payload,
          );
        } else {
          await axiosInstance.post("/cetegoryapi/create", payload);
        }
        fetchCategories();
      }

      setIsModalOpen(false);
      setSelectedItem(null);
      setEditMode(false);
    } catch (error) {
      console.error("Submit error:", error);
      alert(`Error ${editMode ? "updating" : "creating"} ${activeTab}`);
    } finally {
      setModalLoading(false);
    }
  };

  // Logout handlers
  const handleLogoutClick = () => setShowLogoutModal(true);
  const handleCancelLogout = () => setShowLogoutModal(false);
  const handleConfirmLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const tabs = [
    { id: "category", label: "Category", icon: FolderOpen },
    { id: "brand", label: "Brand", icon: Tag },
  ];

  const tableColumns =
    activeTab === "brand"
      ? [
          { key: "name", label: "Name" },
          { key: "categoryName", label: "Category" },
          { key: "status", label: "Status" },
        ]
      : [
          { key: "name", label: "Name" },
          { key: "brandNames", label: "Brands" },
          { key: "status", label: "Status" },
        ];

  const filteredData = getFilteredData();

  const currentTabLabel = activeTab === "brand" ? "Brand" : "Category";
  const currentIcon = activeTab === "brand" ? Tag : FolderOpen;

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 to-violet-50">
      <Sidebar
        user={user}
        onLogout={handleLogoutClick}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      <div className="flex-1 flex min-h-0 flex-col overflow-hidden">
        {/* <Header
          user={user}
          onLogout={handleLogoutClick}
          currentTime={currentTime}
        /> */}

        <main className="flex-1 min-h-0 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                  <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
                    <FolderOpen className="w-5 h-5 text-violet-600" />
                  </div>
                  Master Management
                </h1>
                <p className="text-gray-500 mt-1 ml-13">
                  Manage brands and categories in one place
                </p>
              </div>
            </div>

            {/* Table */}
            <CommonTable
              tableHeader={
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Toggle Tabs */}
                    <div className="bg-gray-00 rounded-xl p-1 flex gap-1 w-full sm:w-auto">
                      {tabs.map((tab) => {
                        const TabIcon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                              isActive
                                ? "bg-white text-violet-700 shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                            }`}
                          >
                            <TabIcon className="w-4 h-4" />
                            {tab.label}
                            <span
                              className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                                isActive
                                  ? "bg-violet-100 text-violet-700"
                                  : "bg-gray-200 text-gray-500"
                              }`}
                            >
                              {tab.id === "brand" ? brands.length : categories.length}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Add Button */}
                    <button
                      onClick={handleAddNew}
                      className="flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl shadow-lg shadow-violet-500/30 transition-all hover:shadow-xl whitespace-nowrap text-sm font-medium"
                    >
                      <Plus className="w-5 h-5" />
                      Add New {currentTabLabel}
                    </button>
                  </div>

                  {/* Search */}
                  <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder={`Search ${activeTab}...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all bg-gray-50 focus:bg-white text-sm"
                    />
                  </div>
                </div>
              }
              columns={tableColumns}
              data={filteredData}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDelete}
              emptyIcon={currentIcon}
            />
          </div>
        </main>
      </div>

      {/* Modal Form */}
      <CommonModalForm
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedItem(null);
          setEditMode(false);
        }}
        onSubmit={handleSubmit}
        title={currentTabLabel}
        editMode={editMode}
        initialData={selectedItem}
        loading={modalLoading}
      />

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        userName={user.name}
        onCancel={handleCancelLogout}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
};

export default MasterPage;
