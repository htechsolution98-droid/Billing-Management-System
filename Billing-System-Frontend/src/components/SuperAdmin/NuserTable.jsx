import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus ,Eye} from "lucide-react";
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

  const themeColors =
    themes.find((theme) => theme.id === currentTheme)?.colors ||
    themes[0].colors;

  useEffect(() => {
    fetchNusers();
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
  }, []);

  useEffect(() => {
    localStorage.setItem("superadmin-theme", currentTheme);
  }, [currentTheme]);

  const fetchNusers = async () => {
    try {
      const res = await axiosInstance.get("/nuserapi/get");
      const nuserData = res.data.data || res.data || [];
      setNusers(Array.isArray(nuserData) ? nuserData : []);
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

  const handleUpdate = (updatedNuser) => {
    setNusers((prev) =>
      prev.map((item) => (item._id === updatedNuser._id ? updatedNuser : item)),
    );
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this nuser from the table view?")) return;
    setNusers((prev) => prev.filter((item) => item._id !== id));
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
                  Add Nuser
                </button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white">
              <table className="min-w-full table-fixed">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      "Name",
                      "Firm",
                      "Mobile",
                      "Email",
                      "Distributor",
                      "Status",
                      "Actions",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-gray-400"
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
                    nusers.map((nuser) => {
                      const initials = nuser.fullName
                        ?.split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase();

                      return (
                        <tr
                          key={nuser._id}
                          className="transition-colors hover:bg-gray-50"
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2.5">
                              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-violet-50 text-[11px] font-semibold text-violet-800">
                                {initials || "N"}
                              </div>
                              <span className="truncate text-sm font-medium text-gray-800">
                                {nuser.fullName}
                              </span>
                            </div>
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
                            {nuser.distributorId?.name || "-"}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-800">
                            {nuser.status || "active"}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleView(nuser)}
                                className="rounded-md bg-blue-50 px-2.5 py-1 text-[11px] font-medium text-blue-800 transition-colors hover:bg-blue-100"
                              >
                               <Eye className="w-5 h-4 mr-2" /> View
                              </button>
                              {/* <button
                                onClick={() => handleEdit(nuser)}
                                className="rounded-md bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-amber-800 transition-colors hover:bg-amber-100"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(nuser._id)}
                                className="rounded-md bg-red-50 px-2.5 py-1 text-[11px] font-medium text-red-800 transition-colors hover:bg-red-100"
                              >
                                Delete
                              </button> */}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
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
