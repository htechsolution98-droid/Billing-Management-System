import { useEffect, useState } from "react";
import { X, User, Building2, Banknote, ShieldCheck } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";

const AddNuserModal = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [superadmin, setSuperadmin] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    firmName: "",
    gst: "",
    pan: "",
    firmLogo: null,
    aadhaar: "",
    email: "",
    password: "",
    mobile: "",
    superAdminId: "",
    bankName: "",
    ifsc: "",
    accountNumber: "",
    accountHolderName: "",
    status: "active",
  });

  useEffect(() => {
    try {
      const rawUser = localStorage.getItem("user");
      const loggedInUser = rawUser ? JSON.parse(rawUser) : null;
      if (loggedInUser) {
        setSuperadmin(loggedInUser);
        setFormData((prev) => ({
          ...prev,
          superAdminId: loggedInUser._id || "",
        }));
      }
    } catch (error) {
      console.error("Error reading superadmin data:", error);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== "") {
          data.append(key, formData[key]);
        }
      });
      await axiosInstance.post("/nuserapi/create", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onSuccess();
      onClose();
      // Reset form
      setFormData({
        fullName: "", firmName: "", gst: "", pan: "", firmLogo: null,
        aadhaar: "", email: "", password: "", mobile: "",
        superAdminId: superadmin?._id || "",
        bankName: "", ifsc: "", accountNumber: "", accountHolderName: "",
        status: "active",
      });
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error Adding User");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="max-h-[95vh] w-full max-w-5xl overflow-hidden rounded-[2.5rem] bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-8 py-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Add New User</h2>
            <p className="text-sm text-gray-500">Create a new user account under your management</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-2xl p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto px-8 py-8">
          <form id="add-nuser-form" onSubmit={handleSubmit} className="space-y-10">
            {/* Personal Details */}
            <section>
              <h3 className="mb-6 flex items-center gap-3 text-lg font-bold text-gray-800">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <User className="h-5 w-5" />
                </div>
                Personal Information
              </h3>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Full Name *</label>
                  <input
                    type="text" name="fullName" required value={formData.fullName} onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 px-5 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    placeholder="Enter full name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Mobile Number *</label>
                  <input
                    type="text" name="mobile" required value={formData.mobile} onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 px-5 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    placeholder="Enter mobile"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Email Address *</label>
                  <input
                    type="email" name="email" required value={formData.email} onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 px-5 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    placeholder="Enter email"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Password *</label>
                  <input
                    type="password" name="password" required value={formData.password} onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 px-5 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    placeholder="Create password"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Aadhaar Number *</label>
                  <input
                    type="text" name="aadhaar" required value={formData.aadhaar} onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 px-5 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    placeholder="12-digit UID"
                  />
                </div>
              </div>
            </section>

            {/* Business Details */}
            <section>
              <h3 className="mb-6 flex items-center gap-3 text-lg font-bold text-gray-800">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <Building2 className="h-5 w-5" />
                </div>
                Business Information
              </h3>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Firm Name *</label>
                  <input
                    type="text" name="firmName" required value={formData.firmName} onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 px-5 py-3 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                    placeholder="Business firm name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">GST Number</label>
                  <input
                    type="text" name="gst" value={formData.gst} onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 px-5 py-3 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                    placeholder="Enter GSTIN"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">PAN Number</label>
                  <input
                    type="text" name="pan" value={formData.pan} onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 px-5 py-3 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                    placeholder="Enter PAN"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Firm Logo</label>
                  <input
                    type="file" name="firmLogo" onChange={handleChange}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-2xl file:border-0 file:text-sm file:font-bold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 transition-all"
                  />
                </div>
              </div>
            </section>

            {/* Bank Details */}
            <section>
              <h3 className="mb-6 flex items-center gap-3 text-lg font-bold text-gray-800">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                  <Banknote className="h-5 w-5" />
                </div>
                Bank Information
              </h3>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Bank Name *</label>
                  <input
                    type="text" name="bankName" required value={formData.bankName} onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 px-5 py-3 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
                    placeholder="e.g. HDFC Bank"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">IFSC Code *</label>
                  <input
                    type="text" name="ifsc" required value={formData.ifsc} onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 px-5 py-3 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
                    placeholder="e.g. HDFC0001234"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Account Number *</label>
                  <input
                    type="text" name="accountNumber" required value={formData.accountNumber} onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 px-5 py-3 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
                    placeholder="Enter account number"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Account Holder Name *</label>
                  <input
                    type="text" name="accountHolderName" required value={formData.accountHolderName} onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 px-5 py-3 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
                    placeholder="As per bank records"
                  />
                </div>
              </div>
            </section>

            {/* Status */}
            <section>
              <h3 className="mb-6 flex items-center gap-3 text-lg font-bold text-gray-800">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                Account Configuration
              </h3>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Account Status</label>
                  <select
                    name="status" value={formData.status} onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 px-5 py-3 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Managed By</label>
                  <input
                    type="text" readOnly value={superadmin?.name || "Super Admin"}
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-3 text-gray-500 outline-none"
                  />
                </div>
              </div>
            </section>
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-4 border-t border-gray-100 bg-gray-50/50 px-8 py-6">
          <button
            onClick={onClose}
            className="rounded-2xl px-6 py-3 text-sm font-bold text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            Cancel
          </button>
          <button
            form="add-nuser-form"
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-10 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700 hover:shadow-emerald-600/30 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Add User"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNuserModal;
