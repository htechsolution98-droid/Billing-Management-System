import { useState, useEffect } from "react";
import {
  Users,
  Plus,
  Eye,
  Edit,
  Trash2,
  Search,
  X,
  Loader2,
  Save,
  MapPin,
  Phone,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import axiosInstance from "../../api/axiosInstance";
import CustomerViewModal from "./CustomerViewModal";
import CustomerEditModal from "./CustomerEditModal";

/* ─── constants ─────────────────────────────────────────── */
const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat",
  "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh",
  "Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab",
  "Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh",
  "Uttarakhand","West Bengal","Delhi","Jammu & Kashmir","Ladakh",
];

const EMPTY_FORM = {
  customerName: "", mobile: "", email: "", gst: "",
  address: "", state: "", district: "", area: "", pincode: "",
};

const inputCls =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:border-purple-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-100 transition";

const Field = ({ label, required, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

/* ─── main component ─────────────────────────────────────── */
const CustomerSection = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  /* modals */
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  /* fetch */
  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/customerapi/my-customers");
      setCustomers(res.data.data || []);
    } catch (err) {
      console.error("Fetch customers error:", err);
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCustomers(); }, []);

  /* form helpers */
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
      alert("Failed to delete customer.");
    }
  };

  /* filtered list */
  const filtered = customers.filter((c) =>
    [c.customerName, c.mobile, c.email, c.state, c.district]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div id="customers" className="space-y-6">

      {/* ── Create Customer Form ─────────────────────────── */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        {/* card header / toggle */}
        <button
          onClick={() => setFormOpen((p) => !p)}
          className="w-full flex items-center justify-between px-6 py-5 border-b border-gray-100 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-purple-50 p-2">
              <Plus className="h-5 w-5 text-purple-600" />
            </div>
            <div className="text-left">
              <h3 className="text-base font-bold text-gray-800">Add New Customer</h3>
              <p className="text-xs text-gray-400">Fill in the details to register a new customer</p>
            </div>
          </div>
          {formOpen ? (
            <ChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </button>

        {/* collapsible form */}
        {formOpen && (
          <form onSubmit={handleCreate} className="px-6 py-6">
            {formError && (
              <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {formError}
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                  maxLength={10}
                  className={inputCls}
                />
              </Field>
              <Field label="Email">
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email (optional)"
                  className={inputCls}
                />
              </Field>
              <Field label="GST Number">
                <input
                  name="gst"
                  value={form.gst}
                  onChange={handleChange}
                  placeholder="GST number (optional)"
                  className={inputCls}
                />
              </Field>
              <div className="sm:col-span-2 lg:col-span-2">
                <Field label="Address" required>
                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    placeholder="Street / building address"
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
            </div>

            <div className="mt-5 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => { setFormOpen(false); setForm(EMPTY_FORM); setFormError(null); }}
                className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700 disabled:opacity-60"
              >
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {submitting ? "Saving..." : "Create Customer"}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* ── Customer Table ───────────────────────────────── */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        {/* table header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-purple-50 p-2">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-800">My Customers</h3>
              <p className="text-xs text-gray-400">All customers you have registered</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-xl bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700">
              Total: {customers.length}
            </span>
            {/* search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="rounded-xl border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-100 w-44 transition"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* table body */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center gap-2 py-14 text-sm text-gray-400">
              <Loader2 className="h-5 w-5 animate-spin text-purple-500" />
              Loading customers...
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-14 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-50">
                <Users className="h-6 w-6 text-purple-400" />
              </div>
              <p className="text-sm font-medium text-gray-500">
                {search ? "No customers match your search." : "No customers yet. Add your first one!"}
              </p>
            </div>
          ) : (
            <table className="min-w-full table-fixed">
              <thead className="bg-gray-50">
                <tr>
                  {["Customer", "Mobile", "Location", "GST", "Status", "Actions"].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((c) => {
                  const initials =
                    c.customerName
                      ?.split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase() || "C";
                  return (
                    <tr key={c._id} className="transition-colors hover:bg-gray-50">
                      {/* Customer */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-violet-600 text-xs font-bold text-white">
                            {initials}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">{c.customerName}</p>
                            <p className="text-xs text-gray-400 truncate max-w-[140px]">{c.email || "—"}</p>
                          </div>
                        </div>
                      </td>
                      {/* Mobile */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Phone className="h-3.5 w-3.5 text-gray-400" />
                          {c.mobile || "—"}
                        </div>
                      </td>
                      {/* Location */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
                          <span className="truncate max-w-[130px]">
                            {c.area ? `${c.area}, ${c.district}` : c.district || "—"}
                          </span>
                        </div>
                        <p className="ml-5 text-xs text-gray-400">{c.state}</p>
                      </td>
                      {/* GST */}
                      <td className="px-5 py-3.5 text-sm text-gray-600">{c.gst || "—"}</td>
                      {/* Status */}
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            c.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {c.status || "active"}
                        </span>
                      </td>
                      {/* Actions */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => { setSelected(c); setViewOpen(true); }}
                            title="View"
                            className="rounded-lg p-1.5 text-blue-600 transition hover:bg-blue-50"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => { setSelected(c); setEditOpen(true); }}
                            title="Edit"
                            className="rounded-lg p-1.5 text-amber-600 transition hover:bg-amber-50"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(c._id)}
                            title="Delete"
                            className="rounded-lg p-1.5 text-red-600 transition hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ── Modals ──────────────────────────────────────── */}
      <CustomerViewModal
        isOpen={viewOpen}
        customer={selected}
        onClose={() => { setViewOpen(false); setSelected(null); }}
      />
      <CustomerEditModal
        isOpen={editOpen}
        customer={selected}
        onClose={() => { setEditOpen(false); setSelected(null); }}
        onUpdated={fetchCustomers}
      />
    </div>
  );
};

export default CustomerSection;
