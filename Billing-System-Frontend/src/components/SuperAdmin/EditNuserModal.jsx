import { useEffect, useState } from "react";
import { X, Save } from "lucide-react";

const inputClassName =
  "w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-200";

const EditNuserModal = ({ isOpen, nuser, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    firmName: "",
    email: "",
    password: "",
    mobile: "",
    gst: "",
    pan: "",
    aadhaar: "",
    bankName: "",
    ifsc: "",
    accountNumber: "",
    accountHolderName: "",
    status: "active",
  });

  useEffect(() => {
    if (nuser) {
      setFormData({
        fullName: nuser.fullName || "",
        firmName: nuser.firmName || "",
        email: nuser.email || "",
        password: "",
        mobile: nuser.mobile || "",
        gst: nuser.gst || "",
        pan: nuser.pan || "",
        aadhaar: nuser.aadhaar || "",
        bankName: nuser.bankName || "",
        ifsc: nuser.ifsc || "",
        accountNumber: nuser.accountNumber || "",
        accountHolderName: nuser.accountHolderName || "",
        status: nuser.status || "active",
      });
    }
  }, [nuser]);

  if (!isOpen || !nuser) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      _id: nuser._id,
      ...formData,
      email: formData.email.trim().toLowerCase(),
      password: formData.password.trim(),
    };

    if (!payload.password) {
      delete payload.password;
    }

    onUpdate(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Edit Nuser</h3>
            <p className="mt-1 text-sm text-gray-500">
              Update nuser information in the table.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-h-[calc(90vh-88px)] overflow-y-auto px-6 py-6"
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={inputClassName}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Firm Name
              </label>
              <input
                name="firmName"
                value={formData.firmName}
                onChange={handleChange}
                className={inputClassName}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputClassName}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter new password"
                className={inputClassName}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Mobile
              </label>
              <input
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className={inputClassName}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                GST Number
              </label>
              <input
                name="gst"
                value={formData.gst}
                onChange={handleChange}
                className={inputClassName}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                PAN Number
              </label>
              <input
                name="pan"
                value={formData.pan}
                onChange={handleChange}
                className={inputClassName}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Aadhaar Number
              </label>
              <input
                name="aadhaar"
                value={formData.aadhaar}
                onChange={handleChange}
                className={inputClassName}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Bank Name
              </label>
              <input
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                className={inputClassName}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">IFSC</label>
              <input
                name="ifsc"
                value={formData.ifsc}
                onChange={handleChange}
                className={inputClassName}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Account Number
              </label>
              <input
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                className={inputClassName}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Account Holder Name
              </label>
              <input
                name="accountHolderName"
                value={formData.accountHolderName}
                onChange={handleChange}
                className={inputClassName}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={inputClassName}
              >
                <option value="active">active</option>
                <option value="inactive">inactive</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3 border-t border-gray-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-700"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNuserModal;
