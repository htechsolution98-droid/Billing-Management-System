import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Plus, Eye } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";
import Sidebar from "./Sidebar";
import Header from "./Header";
import LogoutModal from "./LogoutModal";
import ThemeToggle, { themes } from "./ThemeToggle";
import ViewDistributorModal from "./ViewDistributorModal";
import EditDistributorModal from "./EditDistributorModal";
import DistributorStatusToggle from "./DistributorStatusToggle";

const ManageDistributors = () => {
  const [distributors, setDistributors] = useState([]);
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem("superadmin-theme") || "emerald";
  });
  const [user, setUser] = useState({
    name: "",
    role: "",
    email: "",
  });
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedDistributor, setSelectedDistributor] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const limit = 5;

  const themeColors =
    themes.find((theme) => theme.id === currentTheme)?.colors ||
    themes[0].colors;

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
    }

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem("superadmin-theme", currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        handleSearch(searchQuery);
      } else {
        fetchDistributors(currentPage);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, currentPage]);

  const handleSearch = async (query) => {
    try {
      const res = await axiosInstance.get(
        `/distributorapi/distributorsearch?keyword=${query}`,
      );
      setDistributors(res.data.data || []);
    } catch (error) {
      console.error("Search Error:", error);
    }
  };

  const fetchDistributors = async (page = currentPage) => {
    try {
      const res = await axiosInstance.get(`/distributorapi/get?page=${page}&limit=${limit}`);

      console.log("API Response:", res.data);

      // Safe handling
      const distributorData = res.data.data || res.data || [];

      setDistributors(distributorData);
      
      if (res.data.totalPages !== undefined) {
        setTotalPages(res.data.totalPages);
        setTotalItems(res.data.total);
        setCurrentPage(res.data.page);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };
  // *********************************Delete API *******************************
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/distributorapi/distributor/delete/${id}`);
      console.log("delete id", id);

      fetchDistributors();
    } catch (error) {
      console.error(error);
    }
  };
  // *****************************************************************************
  const handleView = (distributor) => {
    setSelectedDistributor(distributor);
    setViewModalOpen(true);
  };

  const handleEdit = (distributor) => {
    setSelectedDistributor(distributor);
    setEditModalOpen(true);
  };
  // =================================update data api ================================
  const handleUpdate = async (updatedDistributor) => {
    try {
      console.log("Updating ID:", updatedDistributor._id);

      // API CALL
      await axiosInstance.put(
        `/distributorapi/distributor/update/${updatedDistributor._id}`,
        updatedDistributor,
      );

      // Refresh data from backend
      fetchDistributors();

      // Close modal
      setEditModalOpen(false);
      setSelectedDistributor(null);

      alert("Distributor Updated Successfully ✅");
    } catch (error) {
      console.error("Update Error:", error);
      alert("Update Failed ❌");
    }
  };

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
    <div
      className={`flex h-screen overflow-hidden bg-gradient-to-br ${themeColors.gradientBg}`}
    >
      <Sidebar
        user={user}
        onLogout={handleLogoutClick}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        themeColors={themeColors}
      />

      <div className="flex-1 flex min-h-0 flex-col overflow-hidden">
        <Header
          user={user}
          onLogout={handleLogoutClick}
          currentTime={currentTime}
          themeColors={themeColors}
        >
          <ThemeToggle
            currentTheme={currentTheme}
            onThemeChange={setCurrentTheme}
          />
        </Header>

        <main className="flex-1 min-h-0 overflow-y-auto p-4 lg:p-6">
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Manage Distributors
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  View and manage all registered distributors.
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Search Bar */}
                <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-2">
                  <Search className="w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search User By Name"
                    className="bg-transparent border-none outline-none text-sm w-40 lg:w-48"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div
                  className={`rounded-xl bg-gradient-to-r ${themeColors.primaryLight} px-4 py-2 text-sm font-medium ${themeColors.primaryText}`}
                >
                  Total: {distributors.length}
                </div>
                <button
                  onClick={() => navigate("/add-distributor")}
                  className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl shadow-md transition"
                >
                  <Plus className="w-5 h-5" />
                  Add Distributor
                </button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white">
              {/* Table header bar */}
              {/* <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-700">
                  Distributors
                </h3>
                <span className="text-xs font-medium text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                  {distributors.length} records
                </span>
              </div> */}

              <table className="min-w-full table-fixed">
                <thead className="bg-gray-50">
                  <tr>
                    {["Name", "Firm", "Email", "Status", "Actions"].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-gray-400"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-50">
                  {distributors.length === 0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="py-10 text-center text-sm text-gray-400"
                      >
                        No distributors found.
                      </td>
                    </tr>
                  ) : (
                    distributors.map((dist) => {
                      const initials = dist.name
                        ?.split(" ")
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase();

                      const avatarColors = [
                        "bg-blue-50 text-blue-800",
                        "bg-emerald-50 text-emerald-800",
                        "bg-purple-50 text-purple-800",
                        "bg-orange-50 text-orange-800",
                        "bg-amber-50 text-amber-800",
                      ];
                      const color =
                        avatarColors[
                          dist._id?.charCodeAt(0) % avatarColors.length
                        ] ?? avatarColors[0];

                      return (
                        <tr
                          key={dist._id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          {/* Name + avatar */}
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold flex-shrink-0 ${color}`}
                              >
                                {initials}
                              </div>
                              <span className="text-sm font-medium text-gray-800 truncate">
                                {dist.name}
                              </span>
                            </div>
                          </td>

                          <td className="px-4 py-3 text-sm  font-medium text-gray-800 truncate">
                            {dist.firmName}
                          </td>
                          <td className="px-4 py-3 text-sm  font-medium text-gray-800 truncate">
                            {dist.email}
                          </td>

                          {/* Status */}
                          <td className="px-4 py-3">
                            <DistributorStatusToggle
                              distributorId={dist._id}
                              isActive={dist.isActive}
                              token={localStorage.getItem("token")}
                            />
                          </td>

                          {/* Actions */}
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleView(dist)}
                                className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-blue-50 text-blue-800 hover:bg-blue-100 transition-colors"
                              >
                                <Eye className="w-4 h-4 mr-2" />
                              </button>
                              <button
                                onClick={() => handleEdit(dist)}
                                className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-amber-50 text-amber-800 hover:bg-amber-100 transition-colors"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(dist._id)}
                                className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-red-50 text-red-800 hover:bg-red-100 transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
              
              {/* Pagination UI */}
              {!searchQuery && totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-100 px-6 py-4 bg-white gap-4">
                  <div className="text-sm text-gray-500">
                    Showing <span className="font-medium text-gray-800">{((currentPage - 1) * limit) + 1}</span> to <span className="font-medium text-gray-800">{Math.min(currentPage * limit, totalItems)}</span> of <span className="font-medium text-gray-800">{totalItems}</span> results
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                      Previous
                    </button>
                    <div className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg">
                      {currentPage} / {totalPages}
                    </div>
                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <LogoutModal
        isOpen={showLogoutModal}
        userName={user.name}
        onCancel={handleCancelLogout}
        onConfirm={handleConfirmLogout}
      />

      <ViewDistributorModal
        isOpen={viewModalOpen}
        distributor={selectedDistributor}
        onClose={() => {
          setViewModalOpen(false);
          setSelectedDistributor(null);
        }}
      />

      <EditDistributorModal
        isOpen={editModalOpen}
        distributor={selectedDistributor}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedDistributor(null);
        }}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default ManageDistributors;
