import { useEffect, useState } from "react";
import { X, Save } from "lucide-react";

const inputCls =
  "w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

const DistEditNuserModal = ({ isOpen, nuser, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    firmName: "",
    email: "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...nuser, ...formData });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Edit NUser</h3>
            <p className="mt-1 text-sm text-gray-500">Update NUser information.</p>
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
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "Full Name", name: "fullName" },
              { label: "Firm Name", name: "firmName" },
              { label: "Email", name: "email", type: "email" },
              { label: "Mobile", name: "mobile" },
              { label: "GST Number", name: "gst" },
              { label: "PAN Number", name: "pan" },
              { label: "Aadhaar Number", name: "aadhaar" },
              { label: "Bank Name", name: "bankName" },
              { label: "IFSC Code", name: "ifsc" },
              { label: "Account Number", name: "accountNumber" },
              { label: "Account Holder Name", name: "accountHolderName" },
            ].map(({ label, name, type = "text" }) => (
              <div key={name} className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className={inputCls}
                />
              </div>
            ))}

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={inputCls}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
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
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
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

export default DistEditNuserModal;
