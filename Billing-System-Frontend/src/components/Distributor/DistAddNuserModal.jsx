import { useState } from "react";
import { X, Save, UploadCloud } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";

const inputCls =
  "w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

const DistAddNuserModal = ({ isOpen, onClose, distributorId, onSuccess }) => {
  const [loading, setLoading] = useState(false);
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
  });
  const [logoFile, setLogoFile] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!distributorId) {
      alert("Distributor ID not found.");
      return;
    }

    setLoading(true);
    try {
      // API expects multipart/form-data
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        submitData.append(key, formData[key]);
      });
      submitData.append("distributorId", distributorId);
      
      if (logoFile) {
        submitData.append("firmLogo", logoFile);
      }

      await axiosInstance.post("/nuserapi/create", submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("NUser added successfully!");
      if (onSuccess) onSuccess();
      onClose();
      // Reset form
      setFormData({
        fullName: "", firmName: "", email: "", password: "", mobile: "",
        gst: "", pan: "", aadhaar: "", bankName: "", ifsc: "", accountNumber: "", accountHolderName: ""
      });
      setLogoFile(null);
    } catch (error) {
      console.error("Create NUser Error:", error);
      alert(error.response?.data?.msg || error.response?.data?.message || "Failed to create NUser.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Add New NUser</h3>
            <p className="mt-1 text-sm text-gray-500">Register a new NUser under your distributorship.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="flex max-h-[calc(90vh-88px)] flex-col">
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Full Name *</label>
                <input required type="text" name="fullName" value={formData.fullName} onChange={handleChange} className={inputCls} placeholder="John Doe" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Firm Name *</label>
                <input required type="text" name="firmName" value={formData.firmName} onChange={handleChange} className={inputCls} placeholder="JD Enterprises" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Email *</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} className={inputCls} placeholder="john@example.com" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Password *</label>
                <input required type="password" name="password" value={formData.password} onChange={handleChange} className={inputCls} placeholder="Create a secure password" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Mobile *</label>
                <input required type="text" name="mobile" value={formData.mobile} onChange={handleChange} className={inputCls} placeholder="9876543210" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Aadhaar Number *</label>
                <input required type="text" name="aadhaar" value={formData.aadhaar} onChange={handleChange} className={inputCls} placeholder="1234 5678 9012" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">PAN Number</label>
                <input type="text" name="pan" value={formData.pan} onChange={handleChange} className={inputCls} placeholder="ABCDE1234F" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">GST Number</label>
                <input type="text" name="gst" value={formData.gst} onChange={handleChange} className={inputCls} placeholder="22AAAAA0000A1Z5" />
              </div>

              {/* Bank Details */}
              <div className="sm:col-span-2 mt-2 border-b border-gray-100 pb-2">
                <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider text-emerald-700">Bank Details</h4>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Bank Name *</label>
                <input required type="text" name="bankName" value={formData.bankName} onChange={handleChange} className={inputCls} placeholder="State Bank of India" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">IFSC Code *</label>
                <input required type="text" name="ifsc" value={formData.ifsc} onChange={handleChange} className={inputCls} placeholder="SBIN0001234" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Account Number *</label>
                <input required type="text" name="accountNumber" value={formData.accountNumber} onChange={handleChange} className={inputCls} placeholder="1234567890" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Account Holder Name *</label>
                <input required type="text" name="accountHolderName" value={formData.accountHolderName} onChange={handleChange} className={inputCls} placeholder="John Doe" />
              </div>

              {/* File Upload */}
              <div className="sm:col-span-2 space-y-1.5 mt-2">
                <label className="text-sm font-medium text-gray-700">Firm Logo (Optional - Max 2MB)</label>
                <div className="flex items-center gap-4 rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-4 transition-colors hover:bg-gray-100">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <UploadCloud className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-emerald-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-emerald-700 hover:file:bg-emerald-100"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-100 px-6 py-5 bg-gray-50">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-600 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Save className="h-4 w-4" />
              )}
              {loading ? "Saving..." : "Save NUser"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DistAddNuserModal;
