import { useState, useEffect } from "react";
import { X, Save, Loader2 } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat",
  "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh",
  "Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab",
  "Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh",
  "Uttarakhand","West Bengal","Delhi","Jammu & Kashmir","Ladakh",
];

const Field = ({ label, required, children }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

const inputCls =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:border-purple-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-100 transition";

const CustomerEditModal = ({ isOpen, customer, onClose, onUpdated }) => {
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (customer) {
      setForm({
        customerName: customer.customerName || "",
        mobile: customer.mobile || "",
        email: customer.email || "",
        gst: customer.gst || "",
        address: customer.address || "",
        state: customer.state || "",
        district: customer.district || "",
        area: customer.area || "",
        pincode: customer.pincode || "",
        status: customer.status || "active",
      });
      setError(null);
    }
  }, [customer]);

  if (!isOpen || !customer) return null;

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await axiosInstance.put(`/customerapi/update/${customer._id}`, form);
      onUpdated?.();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update customer.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Edit Customer</h3>
            <p className="mt-0.5 text-sm text-gray-500">Update customer information.</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-h-[calc(90vh-80px)] overflow-y-auto px-6 py-6">
          {error && (
            <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Customer Name" required>
              <input
                name="customerName"
                value={form.customerName}
                onChange={handleChange}
                required
                placeholder="Full name"
                className={inputCls}
              />
            </Field>
            <Field label="Mobile" required>
              <input
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                required
                placeholder="10-digit number"
                className={inputCls}
              />
            </Field>
            <Field label="Email">
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email address"
                className={inputCls}
              />
            </Field>
            <Field label="GST Number">
              <input
                name="gst"
                value={form.gst}
                onChange={handleChange}
                placeholder="GST number"
                className={inputCls}
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Address" required>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  placeholder="Street address"
                  className={inputCls}
                />
              </Field>
            </div>
            <Field label="Area" required>
              <input
                name="area"
                value={form.area}
                onChange={handleChange}
                required
                placeholder="Area / locality"
                className={inputCls}
              />
            </Field>
            <Field label="District" required>
              <input
                name="district"
                value={form.district}
                onChange={handleChange}
                required
                placeholder="District"
                className={inputCls}
              />
            </Field>
            <Field label="State" required>
              <select
                name="state"
                value={form.state}
                onChange={handleChange}
                required
                className={inputCls}
              >
                <option value="">Select state</option>
                {INDIAN_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </Field>
            <Field label="Pincode" required>
              <input
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                required
                placeholder="6-digit pincode"
                maxLength={6}
                className={inputCls}
              />
            </Field>
            <Field label="Status">
              <select name="status" value={form.status} onChange={handleChange} className={inputCls}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </Field>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700 disabled:opacity-60"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerEditModal;
