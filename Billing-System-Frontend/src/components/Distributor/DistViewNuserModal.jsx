import { useEffect, useState } from "react";
import {
  X,
  UserCircle,
  Building2,
  Mail,
  BadgeCheck,
  Landmark,
  Users,
  Eye ,
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
  const [loadingCustomers, setLoadingCustomers] = useState(false);

  // Fetch customers belonging to this NUser when modal opens
  useEffect(() => {
    if (!isOpen || !nuser?._id) return;

    const fetchCustomers = async () => {
      setLoadingCustomers(true);
      try {
        const res = await axiosInstance.get(
          `/customerapi/get?nuserId=${nuser._id}`
        );
        setCustomers(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
        setCustomers([]);
      } finally {
        setLoadingCustomers(false);
      }
    };

    fetchCustomers();

    return () => setCustomers([]);
  }, [isOpen, nuser?._id]);

  if (!isOpen || !nuser) return null;

  const initials = nuser.fullName
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
                <InfoCard label="PAN Number" value={nuser.pan} />
                <InfoCard label="Aadhaar Number" value={nuser.aadhaar} />
                <InfoCard label="IFSC Code" value={nuser.ifsc} />
                <InfoCard label="Account Number" value={nuser.accountNumber} />
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
                <InfoCard label="Firm Logo" value={nuser.firmLogo || "Not uploaded"} />
                <InfoCard label="Created On" value={nuser.createdAt?.slice(0, 10)} />
              </div>
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="my-6 border-t border-gray-200" />

          {/* ── Customers Section ── */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-emerald-600" />
                <h5 className="text-sm font-semibold text-gray-700">Customers</h5>
              </div>
              {!loadingCustomers && (
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                  {customers.length} record{customers.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white">
              {loadingCustomers ? (
                <div className="space-y-2 p-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-full animate-pulse rounded-lg bg-gray-100"
                    />
                  ))}
                </div>
              ) : (
                <table className="min-w-full table-fixed">
                  <thead className="bg-gray-50">
                    <tr>
                      {["Name", "Mobile", "Email", "City"].map((col) => (
                        <th
                          key={col}
                          className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-gray-400"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {customers.length === 0 ? (
                      <tr>
                        <td
                          colSpan={4}
                          className="py-8 text-center text-sm text-gray-400"
                        >
                          No Customers Found
                        </td>
                      </tr>
                    ) : (
                      customers.map((cust) => {
                        const cInitials = (cust.name || cust.fullName || "C")
                          .split(" ")
                          .map((w) => w[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase();

                        return (
                          <tr
                            key={cust._id}
                            className="transition-colors hover:bg-gray-50"
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2.5">
                                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-teal-50 text-[10px] font-semibold text-teal-700">
                                  {cInitials}
                                </div>
                                <span className="truncate text-sm font-medium text-gray-800">
                                  {cust.name || cust.fullName || "-"}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm font-medium text-gray-800">
                              {cust.mobile || "-"}
                            </td>
                            <td className="truncate px-4 py-3 text-sm font-medium text-gray-800">
                              {cust.email || "-"}
                            </td>
                            <td className="truncate px-4 py-3 text-sm font-medium text-gray-800">
                              {cust.city || "-"}
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
          {/* ── End Customers Section ── */}

        </div>
      </div>
    </div>
  );
};

export default DistViewNuserModal;
