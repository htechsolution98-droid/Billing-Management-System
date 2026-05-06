import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Eye, Users,Trash2,Edit } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";
import Sidebar from "./Sidebar";
import Header from "./Header";
import LogoutModal from "./LogoutModal";
import ThemeToggle, { themes } from "./ThemeToggle";
import ViewNuserModal from "./ViewNuserModal";
import EditNuserModal from "./EditNuserModal";

const ManageNusers = () => {
  const [nusers, setNusers] = useState([]);
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
  const [selectedNuser, setSelectedNuser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const limit = 5;

  const themeColors =
    themes.find((theme) => theme.id === currentTheme)?.colors ||
    themes[0].colors;

  useEffect(() => {
    fetchNusers(currentPage);
    try {
      const rawUser = localStorage.getItem("user");
      const userData = rawUser ? JSON.parse(rawUser) : null;
      if (userData) {
        setUser(userData);
      }
    } catch (error) {
      console.error("Invalid user data in localStorage", error);
    }

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem("superadmin-theme", currentTheme);
  }, [currentTheme]);

  const fetchNusers = async (page = currentPage) => {
    try {
      const res = await axiosInstance.get(`/nuserapi/get?page=${page}&limit=${limit}`);
      const nuserData = res.data.data || res.data || [];
      setNusers(Array.isArray(nuserData) ? nuserData : []);
      
      if (res.data.totalPages !== undefined) {
        setTotalPages(res.data.totalPages);
        setTotalItems(res.data.total);
        setCurrentPage(res.data.page);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setNusers([]);
    }
  };

  const handleView = (nuser) => {
    setSelectedNuser(nuser);
    setViewModalOpen(true);
  };

  const handleEdit = (nuser) => {
    setSelectedNuser(nuser);
    setEditModalOpen(true);
  };

  const handleUpdate = async (updatedNuser) => {
    try {
      await axiosInstance.put(
        `/distributorapi/nuser/update/${updatedNuser._id}`,
        updatedNuser
      );
      fetchNusers();
      setEditModalOpen(false);
      setSelectedNuser(null);
      alert("Nuser Updated Successfully ✅");
    } catch (error) {
      console.error("Update Error:", error);
      alert("Update Failed ❌");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this nuser?")) return;
    try {
      await axiosInstance.delete(`/distributorapi/nuser/delete/${id}`);
      fetchNusers();
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Delete Failed ❌");
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

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        {/* <Header
          user={user}
          onLogout={handleLogoutClick}
          currentTime={currentTime}
          themeColors={themeColors}
        >
          <ThemeToggle
            currentTheme={currentTheme}
            onThemeChange={setCurrentTheme}
          />
        </Header> */}

        <main className="flex-1 min-h-0 overflow-y-auto p-4 lg:p-6">
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Manage Nusers
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  View and manage all registered nusers.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className={`rounded-xl bg-gradient-to-r ${themeColors.primaryLight} px-4 py-2 text-sm font-medium ${themeColors.primaryText}`}
                >
                  Total: {nusers.length}
                </div>
                <button
                  onClick={() => navigate("/add-nuser")}
                  className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-white shadow-md transition hover:bg-violet-700"
                >
                  <Plus className="h-5 w-5" />
                  Add User
                </button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white">
              <table className="min-w-full table-fixed">
                <thead className="bg-gray-50 ">
                  <tr>
                    {[
                      "ID",
                      "Name",
                      "Firm",
                      "Mobile",
                      "Email",
                      "Created By",
                      "Status",
                      "Actions",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-black"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-50">
                  {nusers.length === 0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="py-10 text-center text-sm text-gray-400"
                      >
                        No nusers found.
                      </td>
                    </tr>
                  ) : (
                    nusers.map((nuser, index) => {
                      const displayId = (currentPage - 1) * limit + (index + 1);
                      return (
                        <tr
                          key={nuser._id}
                          className="transition-colors hover:bg-gray-50"
                        >
                          <td className="px-4 py-3 text-xs font-bold text-black">
                            #{displayId}
                          </td>
                          <td className="px-4 py-3">
                            <span className="truncate text-sm font-medium text-gray-800">
                              {nuser.fullName}
                            </span>
                          </td>
                          <td className="truncate px-4 py-3 text-sm font-medium text-gray-800">
                            {nuser.firmName}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-800">
                            {nuser.mobile}
                          </td>
                          <td className="truncate px-4 py-3 text-sm font-medium text-gray-800">
                            {nuser.email}
                          </td>
                          <td className="truncate px-4 py-3 text-sm font-medium text-gray-800">
                            {nuser.distributorId?.name || nuser.superAdminId?.name || "-"}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-800">
                            {nuser.status || "active"}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              {/* Customer View */}
                              <button
                                onClick={() => navigate(`/superadmin/nuser-customers/${nuser._id}`)}
                                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold bg-violet-50 text-violet-700 hover:bg-violet-100 transition-all border border-violet-100"
                                title="View Customers"
                              >
                                <Users className="w-3.5 h-3.5" />
                                <span>Customer View</span>
                              </button>

                              {/* View Info */}
                              <button
                                onClick={() => handleView(nuser)}
                                className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all border border-blue-100"
                                title="View Info"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>

                              {/* Edit */}
                              <button
                                onClick={() => handleEdit(nuser)}
                                className="p-1.5 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition-all border border-amber-100"
                                title="Edit"
                              >
                                {/* <Eye className="w-3.5 h-3.5 hidden" /> dummy for spacing if needed */}
                                {/* <span className="text-xs font-bold px-1">Edit</span> */}
                                <Edit className="w-3.5 h-3.5" />
                              </button>

                              {/* Delete */}
                              <button
                                onClick={() => handleDelete(nuser._id)}
                                className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all border border-red-100"
                                title="Delete"
                              >
                                {/* <span className="text-xs font-bold px-1">Delete</span> */}
                                <Trash2 className="w-3.5 h-3.5" />
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
              {totalPages > 1 && (
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

      <ViewNuserModal
        isOpen={viewModalOpen}
        nuser={selectedNuser}
        onClose={() => {
          setViewModalOpen(false);
          setSelectedNuser(null);
        }}
      />

      <EditNuserModal
        isOpen={editModalOpen}
        nuser={selectedNuser}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedNuser(null);
        }}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default ManageNusers;
