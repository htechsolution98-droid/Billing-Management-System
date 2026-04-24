import { useEffect, useState } from "react";
import {
  X,
  UserCircle,
  Building2,
  Mail,
  BadgeCheck,
  Landmark,
  Users,
  ShoppingCart,
  MapPin,
  Phone,
  AlertCircle,
} from "lucide-react";
import axiosInstance from "../../api/axiosInstance";

const InfoCard = ({ label, value }) => (
  <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
    <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
      {label}
    </p>
    <p className="mt-1 text-sm font-medium text-gray-800">{value || "-"}</p>
  </div>
);

const DistViewNuserModal = ({ isOpen, nuser, onClose }) => {
  const [customers, setCustomers] = useState([]);
  const [customersLoading, setCustomersLoading] = useState(false);
  const [customersError, setCustomersError] = useState(null);

  useEffect(() => {
    if (!isOpen || !nuser?._id) return;

    const fetchCustomers = async () => {
      setCustomersLoading(true);
      setCustomersError(null);
      try {
        const res = await axiosInstance.get(
          `/customerapi/nuser/${nuser._id}`
        );
        setCustomers(res.data.data || []);
      } catch (err) {
        console.error("Fetch Customers Error:", err);
        setCustomersError("Failed to load customers.");
        setCustomers([]);
      } finally {
        setCustomersLoading(false);
      }
    };

    fetchCustomers();
  }, [isOpen, nuser?._id]);

  if (!isOpen || !nuser) return null;

  const initials =
    nuser.fullName
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "N";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* ── Header ── */}
        <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">NUser Details</h3>
            <p className="mt-1 text-sm text-gray-500">
              View complete information for this NUser.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ── Scrollable body ── */}
        <div className="max-h-[calc(90vh-88px)] overflow-y-auto px-6 py-6">

          {/* Avatar banner */}
          <div className="mb-6 flex items-center gap-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 p-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-lg font-bold text-white">
              {initials}
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800">{nuser.fullName}</h4>
              <p className="text-sm text-gray-500">{nuser.email || "No email available"}</p>
            </div>
          </div>

          {/* Details grid */}
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <UserCircle className="h-4 w-4 text-emerald-600" />
                <h5 className="text-sm font-semibold text-gray-700">Basic Details</h5>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <InfoCard label="Full Name" value={nuser.fullName} />
                <InfoCard label="Firm Name" value={nuser.firmName} />
                <InfoCard label="Role" value={nuser.role} />
                <InfoCard label="Status" value={nuser.status || "active"} />
                {/* <InfoCard label="Status" value={nuser.password || "active"} /> */}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-600" />
                <h5 className="text-sm font-semibold text-gray-700">Contact Details</h5>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <InfoCard label="Email" value={nuser.email} />
                <InfoCard label="Mobile" value={nuser.mobile} />
                <InfoCard
                  label="Distributor"
                  value={nuser.distributorId?.name || nuser.distributorName}
                />
                <InfoCard label="GST Number" value={nuser.gst} />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-emerald-600" />
                <h5 className="text-sm font-semibold text-gray-700">Identity Details</h5>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <InfoCard label="Aadhaar Number" value={nuser.aadhaar} />
                <InfoCard label="PAN Number" value={nuser.pan} />
                <InfoCard label="Firm Logo" value={nuser.firmLogo || "Not uploaded"} />
                <InfoCard label="Created On" value={nuser.createdAt?.slice(0, 10)} />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Landmark className="h-4 w-4 text-emerald-600" />
                <h5 className="text-sm font-semibold text-gray-700">Bank Details</h5>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <InfoCard label="Bank Name" value={nuser.bankName} />
                <InfoCard label="Account Holder" value={nuser.accountHolderName} />
                <InfoCard label="Account Number" value={nuser.accountNumber} />
                <InfoCard label="IFSC Code" value={nuser.ifsc} />
              </div>
            </div>
          </div>

          {/* ── Customer Table ── */}
          <div className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-blue-50 p-2">
                  <ShoppingCart className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-700">Customers</h5>
                  <p className="text-xs text-gray-400">All customers registered by this NUser</p>
                </div>
              </div>
              {!customersLoading && !customersError && (
                <span className="rounded-xl bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                  Total: {customers.length}
                </span>
              )}
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-100">
              {customersLoading ? (
                <div className="flex items-center justify-center gap-2 py-10 text-sm text-gray-400">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                  Loading customers...
                </div>
              ) : customersError ? (
                <div className="flex items-center justify-center gap-2 py-10 text-sm text-red-400">
                  <AlertCircle className="h-4 w-4" />
                  {customersError}
                </div>
              ) : customers.length === 0 ? (
                <div className="py-10 text-center text-sm text-gray-400">
                  No customers found for this NUser.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full table-fixed">
                    <thead className="bg-gray-50">
                      <tr>
                        {["Customer", "Mobile", "Email", "Address", "State", "Status"].map((h) => (
                          <th
                            key={h}
                            className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {customers.map((c) => {
                        const cInitials = c.customerName
                          ?.split(" ")
                          .map((w) => w[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase() || "C";

                        return (
                          <tr key={c._id} className="transition-colors hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                                  {cInitials}
                                </div>
                                <span className="truncate text-sm font-medium text-gray-800">
                                  {c.customerName}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-1 text-sm text-gray-600">
                                <Phone className="h-3 w-3 text-gray-400" />
                                {c.mobile || "-"}
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600 truncate">
                              {c.email || "-"}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-1 text-sm text-gray-600">
                                <MapPin className="h-3 w-3 flex-shrink-0 text-gray-400" />
                                <span className="truncate max-w-[120px]">
                                  {c.area ? `${c.area}, ${c.district}` : c.address || "-"}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              {c.state || "-"}
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                  c.status === "active"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {c.status || "active"}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
          {/* ── End Customer Table ── */}

        </div>
      </div>
    </div>
  );
};

export default DistViewNuserModal;
