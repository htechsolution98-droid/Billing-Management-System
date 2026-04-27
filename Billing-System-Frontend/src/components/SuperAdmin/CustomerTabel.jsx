import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Eye } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";
import Sidebar from "./Sidebar";
import Header from "./Header";
import LogoutModal from "./LogoutModal";
import ThemeToggle, { themes } from "./ThemeToggle";
import ViewCustomerModal from "./ViewCustomerModal";

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
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
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const themeColors =
    themes.find((theme) => theme.id === currentTheme)?.colors ||
    themes[0].colors;

  useEffect(() => {
    fetchCustomers();
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

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/customerapi/get");
      const customerData = res.data.data || res.data || [];
      setCustomers(Array.isArray(customerData) ? customerData : []);
    } catch (error) {
      console.error("Fetch error:", error);
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (customer) => {
    setSelectedCustomer(customer);
    setIsViewModalOpen(true);
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
                  Manage Customers
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  View and manage all registered customers in the system.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className={`rounded-xl bg-gradient-to-r ${themeColors.primaryLight} px-4 py-2 text-sm font-medium ${themeColors.primaryText}`}
                >
                  Total: {customers.length}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white m-6">
              {loading ? (
                <div className="space-y-4 p-6">
                   {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="h-12 w-full animate-pulse rounded-lg bg-gray-100"
                    />
                  ))}
                </div>
              ) : (
                <table className="min-w-full table-fixed divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {[
                        "Customer Name",
                        "NUser (Creator)",
                        "Mobile",
                        "Email",
                        "Location",
                        "Status",
                        "Actions",
                      ].map((header) => (
                        <th
                          key={header}
                          className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100 bg-white">
                    {customers.length === 0 ? (
                      <tr>
                        <td
                          colSpan="7"
                          className="py-12 text-center"
                        >
                          <div className="flex flex-col items-center justify-center">
                            <div className="rounded-full bg-gray-50 p-4 mb-4">
                              <Users className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="text-sm font-medium text-gray-900">No Customers Found</h3>
                            <p className="mt-1 text-sm text-gray-500">
                              There are currently no customers in the system.
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      customers.map((customer) => {
                        const initials = customer.customerName
                          ?.split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase();

                        return (
                          <tr
                            key={customer._id}
                            className="transition-colors hover:bg-gray-50"
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-[12px] font-semibold text-indigo-700">
                                  {initials || "C"}
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {customer.customerName}
                                  </div>
                                  <div className="text-xs text-gray-500 mt-0.5">
                                    GST: {customer.gst || "N/A"}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium text-gray-800">
                                {customer.nuserId?.fullName || "-"}
                              </div>
                              <div className="text-xs text-gray-500 mt-0.5">
                                Code: {customer.nuserId?.usercode || "-"}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-800">
                              {customer.mobile}
                            </td>
                            <td className="truncate px-6 py-4 text-sm font-medium text-gray-800">
                              {customer.email || "-"}
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-800">
                                {customer.area || "-"}, {customer.district || "-"}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium border ${
                                  customer.status?.toLowerCase() === "active"
                                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                    : "border-red-200 bg-red-50 text-red-700"
                                }`}
                              >
                                <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                                  customer.status?.toLowerCase() === "active" ? "bg-emerald-500" : "bg-red-500"
                                }`}></span>
                                {customer.status || "active"}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleView(customer)}
                                  className="rounded-md bg-blue-50 px-3 py-1.5 text-[11px] font-medium text-blue-700 transition-colors hover:bg-blue-100 flex items-center gap-1.5"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  View
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
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

      <ViewCustomerModal
        isOpen={isViewModalOpen}
        customer={selectedCustomer}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedCustomer(null);
        }}
      />
    </div>
  );
};

export default CustomerTable;
