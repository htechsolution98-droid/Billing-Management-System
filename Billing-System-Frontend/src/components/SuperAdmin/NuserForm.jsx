import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance.js";

const inputCls =
  "w-full h-9 px-3 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 placeholder:text-xs focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all";
const labelCls =
  "text-[11px] font-medium text-gray-400 uppercase tracking-wider";

const SectionHeader = ({ icon, title, iconBg, iconColor }) => (
  <div className="flex items-center gap-2.5 mb-3 pb-2.5 border-b border-gray-100">
    <div
      className={`w-6 h-6 rounded-md flex items-center justify-center text-xs ${iconBg} ${iconColor}`}
    >
      {icon}
    </div>
    <h3 className="text-sm font-medium text-gray-700">{title}</h3>
  </div>
);

const Field = ({ label, required, children }) => (
  <div className="flex flex-col gap-1">
    <label className={labelCls}>
      {label}
      {required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
    {children}
  </div>
);

const AddNUserForm = ({ onClose, refreshData }) => {
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
  }, []);

  useEffect(() => {
    const validateSuperadmin = async () => {
      try {
        const rawUser = localStorage.getItem("user");
        const loggedInUser = rawUser ? JSON.parse(rawUser) : null;
        setSuperadmin(loggedInUser);
        setFormData((prev) => ({
          ...prev,
          superAdminId: loggedInUser?._id || "",
        }));
      } catch (error) {
        console.error("Error loading superadmin:", error);
      }
    };

    validateSuperadmin();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.superAdminId) {
        alert("Superadmin session not found. Please login again.");
        return;
      }

      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== "") {
          data.append(key, formData[key]);
        }
      });
      await axiosInstance.post("/nuserapi/create", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("NUser Added Successfully");
      if (refreshData) refreshData();
      if (onClose) onClose();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error Adding NUser");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-5">
        <h2 className="text-xl font-medium text-gray-800">Add NUser</h2>
        <p className="text-sm text-gray-400 mt-0.5">
          Enter NUser details below to create a new account
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-100 rounded-xl p-6 space-y-6"
      >
        {/* Personal Details */}
        <div>
          <SectionHeader
            icon="👤"
            title="Personal details"
            iconBg="bg-blue-50"
            iconColor="text-blue-800"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <Field label="Full name" required>
              <input
                type="text"
                name="fullName"
                placeholder="e.g. Rahul Sharma"
                onChange={handleChange}
                required
                className={inputCls}
              />
            </Field>
            <Field label="Mobile" required>
              <input
                type="text"
                name="mobile"
                placeholder="+91 98765 43210"
                onChange={handleChange}
                required
                className={inputCls}
              />
            </Field>
            <Field label="Email" required>
              <input
                type="email"
                name="email"
                placeholder="rahul@example.com"
                onChange={handleChange}
                required
                className={inputCls}
              />
            </Field>
            <Field label="Password" required>
              <input
                type="password"
                name="password"
                placeholder="Min. 8 characters"
                onChange={handleChange}
                required
                className={inputCls}
              />
            </Field>
            <Field label="Aadhaar" required>
              <input
                type="text"
                name="aadhaar"
                placeholder="XXXX XXXX XXXX"
                onChange={handleChange}
                required
                className={inputCls}
              />
            </Field>
          </div>
        </div>

        {/* Business Details */}
        <div>
          <SectionHeader
            icon="🏢"
            title="Business details"
            iconBg="bg-emerald-50"
            iconColor="text-emerald-800"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <Field label="Firm name" required>
              <input
                type="text"
                name="firmName"
                placeholder="e.g. Sharma Traders"
                onChange={handleChange}
                required
                className={inputCls}
              />
            </Field>
            <Field label="Super Admin" required>
              <input
                type="text"
                value={superadmin?.name || "Current Super Admin"}
                readOnly
                className={`${inputCls} bg-gray-50 cursor-not-allowed`}
              />
            </Field>
            <Field label="GST number">
              <input
                type="text"
                name="gst"
                placeholder="22AAAAA0000A1Z5"
                onChange={handleChange}
                className={inputCls}
              />
            </Field>
            <Field label="PAN number">
              <input
                type="text"
                name="pan"
                placeholder="ABCDE1234F"
                onChange={handleChange}
                className={inputCls}
              />
            </Field>
            <Field label="Firm logo">
              <input
                type="file"
                name="firmLogo"
                onChange={handleChange}
                className={inputCls + " py-1.5 cursor-pointer"}
              />
            </Field>
          </div>
        </div>

        {/* Bank Details */}
        <div>
          <SectionHeader
            icon="🏦"
            title="Bank details"
            iconBg="bg-amber-50"
            iconColor="text-amber-800"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <Field label="Bank name" required>
              <input
                type="text"
                name="bankName"
                placeholder="e.g. HDFC Bank"
                onChange={handleChange}
                required
                className={inputCls}
              />
            </Field>
            <Field label="IFSC code" required>
              <input
                type="text"
                name="ifsc"
                placeholder="HDFC0001234"
                onChange={handleChange}
                required
                className={inputCls}
              />
            </Field>
            <Field label="Account number" required>
              <input
                type="text"
                name="accountNumber"
                placeholder="XXXXXXXXXXXX"
                onChange={handleChange}
                required
                className={inputCls}
              />
            </Field>
            <Field label="Account holder" required>
              <input
                type="text"
                name="accountHolderName"
                placeholder="As per bank records"
                onChange={handleChange}
                required
                className={inputCls}
              />
            </Field>
          </div>
        </div>

        {/* Status */}
        <div>
          <SectionHeader
            icon="⚡"
            title="Account status"
            iconBg="bg-purple-50"
            iconColor="text-purple-800"
          />
          <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 rounded-lg border border-gray-100 w-fit">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
              Status
            </span>
            <select
              name="status"
              onChange={handleChange}
              defaultValue="active"
              className="h-7 px-2 rounded-md border border-gray-200 text-xs font-medium text-gray-700 bg-white outline-none cursor-pointer focus:border-emerald-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-xs text-gray-300">
            <span className="text-red-400">*</span> Required fields
          </span>
          <div className="flex gap-2.5">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="h-9 px-5 rounded-lg border border-gray-200 text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="h-9 px-6 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors"
            >
              Add NUser
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNUserForm;
