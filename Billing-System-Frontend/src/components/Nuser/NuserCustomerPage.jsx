import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  Search,
  X,
  Loader2,
  Save,
  Users,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import axiosInstance from "../../api/axiosInstance";
import Sidebar from "./Sidebar";
import Header from "./Header";
import LogoutModal from "./LogoutModal";
import CustomerViewModal from "./CustomerViewModal";
import CustomerEditModal from "./CustomerEditModal";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal", "Delhi", "Jammu & Kashmir", "Ladakh",
];

const EMPTY_FORM = {
  customerName: "",
  mobile: "",
  email: "",
  gst: "",
  address: "",
  state: "",
  district: "",
  area: "",
  pincode: "",
};

const inputCls =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:border-purple-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-100 transition";

const NuserCustomerPage = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Form modal state
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  // View/Edit modal state
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selected, setSelected] = useState(null);

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

  // Fetch customers
  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/customerapi/my-customers");
      const data = res.data.data || [];
      setCustomers(data);
      setFilteredCustomers(data);
    } catch (err) {
      console.error("Fetch customers error:", err);
      // Sample data for development
      const sampleData = [
        {
          _id: "1",
          customerName: "Rajesh Kumar",
          mobile: "98765 11111",
          email: "rajesh@example.com",
          gst: "27AABCU9603R1ZX",
          address: "123 Main Street",
          state: "Maharashtra",
          district: "Mumbai",
          area: "Andheri",
          pincode: "400053",
          createdAt: "2026-01-15T10:30:00Z",
        },
        {
          _id: "2",
          customerName: "Priya Sharma",
          mobile: "98766 22222",
          email: "priya@example.com",
          gst: "07AAACS1234R1Z5",
          address: "456 Park Avenue",
          state: "Delhi",
          district: "New Delhi",
          area: "Connaught Place",
          pincode: "110001",
          createdAt: "2026-01-12T14:20:00Z",
        },
        {
          _id: "3",
          customerName: "Amit Patel",
          mobile: "98767 33333",
          email: "amit@example.com",
          gst: "24AAACP5678R1Z2",
          address: "789 Gujarat Road",
          state: "Gujarat",
          district: "Ahmedabad",
          area: "Navrangpura",
          pincode: "380009",
          createdAt: "2026-01-10T09:15:00Z",
        },
      ];
      setCustomers(sampleData);
      setFilteredCustomers(sampleData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Filter customers
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredCustomers(customers);
    } else {
      const filtered = customers.filter(
        (c) =>
          c.customerName?.toLowerCase().includes(search.toLowerCase()) ||
          c.mobile?.includes(search) ||
          c.email?.toLowerCase().includes(search.toLowerCase()) ||
          c.state?.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCustomers(filtered);
    }
  }, [search, customers]);

  // Form handlers
  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);
    try {
      await axiosInstance.post("/customerapi/create", form);
      setForm(EMPTY_FORM);
      setFormOpen(false);
      fetchCustomers();
    } catch (err) {
      setFormError(err.response?.data?.message || "Failed to create customer.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this customer? This action cannot be undone.")) return;
    try {
      await axiosInstance.delete(`/customerapi/delete/${id}`);
      fetchCustomers();
    } catch (err) {
      console.error(err);
      alert("Error deleting customer");
    }
  };

  // Modal handlers
  const openView = (customer) => {
    setSelected(customer);
    setViewOpen(true);
  };

  const openEdit = (customer) => {
    setSelected(customer);
    setEditOpen(true);
  };

  const handleUpdate = () => {
    fetchCustomers();
  };

  // Logout handlers
  const handleLogoutClick = () => setShowLogoutModal(true);
  const handleCancelLogout = () => setShowLogoutModal(false);
  const handleConfirmLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const getInitials = (name) => {
    if (!name) return "C";
    return name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const avatarColors = [
    "bg-violet-100 text-violet-700",
    "bg-purple-100 text-purple-700",
    "bg-fuchsia-100 text-fuchsia-700",
    "bg-indigo-100 text-indigo-700",
    "bg-blue-100 text-blue-700",
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 to-violet-50">
      <Sidebar
        user={user}
        onLogout={handleLogoutClick}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      <div className="flex-1 flex min-h-0 flex-col overflow-hidden">
        <Header
          user={user}
          onLogout={handleLogoutClick}
          currentTime={currentTime}
        />

        <main className="flex-1 min-h-0 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                  <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-violet-600" />
                  </div>
                  Customer Management
                </h1>
                <p className="text-gray-500 mt-1 ml-13">
                  Manage your customers and their details
                </p>
              </div>
              <button
                onClick={() => setFormOpen(true)}
                className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl shadow-lg shadow-violet-500/30 transition-all hover:shadow-xl"
              >
                <Plus className="w-5 h-5" />
                Add Customer
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, mobile, email or state..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all bg-white"
              />
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Table Header */}
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">
                  Customer List
                </h2>
                <span className="text-sm text-gray-500">
                  Total: {filteredCustomers.length}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {["Customer", "Contact", "Location", "GST", "Actions"].map((h) => (
                        <th
                          key={h}
                          className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {loading ? (
                      <tr>
                        <td colSpan="5" className="py-12 text-center">
                          <Loader2 className="w-8 h-8 animate-spin mx-auto text-violet-600" />
                        </td>
                      </tr>
                    ) : filteredCustomers.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="py-12 text-center text-gray-500">
                          <div className="flex flex-col items-center gap-2">
                            <Users className="w-12 h-12 text-gray-300" />
                            <p>No customers found</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredCustomers.map((customer, index) => {
                        const avatarColor =
                          avatarColors[index % avatarColors.length];

                        return (
                          <tr
                            key={customer._id}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${avatarColor}`}
                                >
                                  {getInitials(customer.customerName)}
                                </div>
                                <div>
                                  <p className="font-medium text-gray-800">
                                    {customer.customerName}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {customer.email}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Phone className="w-4 h-4 text-gray-400" />
                                {customer.mobile}
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                {customer.district}, {customer.state}
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <span className="text-sm text-gray-600 font-mono">
                                {customer.gst || "N/A"}
                              </span>
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => openView(customer)}
                                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  View
                                </button>
                                <button
                                  onClick={() => openEdit(customer)}
                                  className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-xs font-medium hover:bg-amber-100 transition-colors"
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(customer._id)}
                                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
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
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add Customer Modal */}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setFormOpen(false)} />
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Add Customer</h2>
                    <p className="text-violet-100 text-sm">Create new customer</p>
                  </div>
                </div>
                <button
                  onClick={() => setFormOpen(false)}
                  className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleCreate} className="overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="p-6 space-y-6">
                {formError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Customer Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="customerName"
                      value={form.customerName}
                      onChange={handleChange}
                      className={inputCls}
                      placeholder="Enter customer name"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Mobile <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="mobile"
                      value={form.mobile}
                      onChange={handleChange}
                      className={inputCls}
                      placeholder="Enter mobile number"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      className={inputCls}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      GST Number
                    </label>
                    <input
                      name="gst"
                      value={form.gst}
                      onChange={handleChange}
                      className={inputCls}
                      placeholder="Enter GST number"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      State <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      className={inputCls}
                      required
                    >
                      <option value="">Select State</option>
                      {INDIAN_STATES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      District <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="district"
                      value={form.district}
                      onChange={handleChange}
                      className={inputCls}
                      placeholder="Enter district"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Area
                    </label>
                    <input
                      name="area"
                      value={form.area}
                      onChange={handleChange}
                      className={inputCls}
                      placeholder="Enter area"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Pincode
                    </label>
                    <input
                      name="pincode"
                      value={form.pincode}
                      onChange={handleChange}
                      className={inputCls}
                      placeholder="Enter pincode"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    rows={3}
                    className={inputCls}
                    placeholder="Enter complete address"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-xl shadow-lg shadow-violet-500/30 transition-all disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Create Customer
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      <CustomerViewModal
        isOpen={viewOpen}
        onClose={() => {
          setViewOpen(false);
          setSelected(null);
        }}
        customer={selected}
      />

      {/* Edit Modal */}
      <CustomerEditModal
        isOpen={editOpen}
        onClose={() => {
          setEditOpen(false);
          setSelected(null);
        }}
        customer={selected}
        onUpdate={handleUpdate}
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

export default NuserCustomerPage;
