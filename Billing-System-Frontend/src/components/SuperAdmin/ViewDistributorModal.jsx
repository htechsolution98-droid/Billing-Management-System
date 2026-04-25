import { useEffect, useState } from "react";
import {
  X,
  Building2,
  Mail,
  MapPin,
  FileText,
  IdCard,
  Users,
  Eye,
} from "lucide-react";
import axiosInstance from "../../api/axiosInstance";
import ViewNuserCustomerModal from "./ViewNuserCustomerModal";

const FieldRow = ({ label, value }) => (
  <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
    <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
      {label}
    </p>
    <p className="mt-1 text-sm font-medium text-gray-800">{value || "-"}</p>
  </div>
);

const ViewDistributorModal = ({ isOpen, distributor, onClose }) => {
  const [nusers, setNusers] = useState([]);
  const [loadingNusers, setLoadingNusers] = useState(false);
  const [selectedNuser, setSelectedNuser] = useState(null);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);

  const handleViewNuser = (nuser) => {
    setSelectedNuser(nuser);
    setIsCustomerModalOpen(true);
  };

  // Fetch NUsers when modal opens and distributor._id is available
  useEffect(() => {
    if (!isOpen || !distributor?._id) return;

    const fetchNusers = async () => {
      setLoadingNusers(true);
      try {
        const res = await axiosInstance.get(
          `/nuserapi/get?distributorId=${distributor._id}`,
        );
        setNusers(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch NUsers:", error);
        setNusers([]);
      } finally {
        setLoadingNusers(false);
      }
    };

    fetchNusers();

    // Clear nusers when modal closes so stale data doesn't show on next open
    return () => setNusers([]);
  }, [isOpen, distributor?._id]);

  if (!isOpen || !distributor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* ── Header ── */}
        <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">
              Distributor Details
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              View complete information for this distributor.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ── Scrollable Body ── */}
        <div className="max-h-[calc(90vh-88px)] overflow-y-auto px-6 py-6">
          {/* ── Distributor Details Grid ── */}
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-600" />
                <h5 className="text-sm font-semibold text-gray-700">
                  Contact Details
                </h5>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <FieldRow label="Name" value={distributor.name} />
                <FieldRow label="Email" value={distributor.email} />
                <FieldRow label="Mobile" value={distributor.mobile} />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-emerald-600" />
                <h5 className="text-sm font-semibold text-gray-700">
                  Business Details
                </h5>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <FieldRow label="Firm Name" value={distributor.firmName} />
                <FieldRow
                  label="Distributor Code"
                  value={distributor.distributorCode}
                />
                <FieldRow label="GST Number" value={distributor.gst} />
                <FieldRow label="Company PAN" value={distributor.companypan} />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <IdCard className="h-4 w-4 text-emerald-600" />
                <h5 className="text-sm font-semibold text-gray-700">
                  Identity Details
                </h5>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <FieldRow label="PAN Number" value={distributor.pan} />
                <FieldRow label="Aadhaar Number" value={distributor.aadhaar} />
                <FieldRow label="Role" value={distributor.role} />
                <FieldRow
                  label="Status"
                  value={distributor.status || "Active"}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-600" />
                <h5 className="text-sm font-semibold text-gray-700">
                  Location Details
                </h5>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <FieldRow label="State" value={distributor.state} />
                <FieldRow label="District" value={distributor.district} />
                <FieldRow label="Area" value={distributor.area} />
                <FieldRow
                  label="Created On"
                  value={distributor.createdAt?.slice(0, 10)}
                />
              </div>
            </div>
          </div>

          {/* ── Additional Notes ── */}
          <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50 p-4">
            <div className="mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4 text-emerald-600" />
              <h5 className="text-sm font-semibold text-gray-700">
                Additional Notes
              </h5>
            </div>
            <p className="text-sm text-gray-600">
              Certificate:{" "}
              {distributor.corpo_certino ||
                distributor.certificate ||
                "Not uploaded"}
            </p>
          </div>

          {/* ── Divider ── */}
          <div className="my-6 border-t border-gray-200" />

          {/* ── NUsers Section ── */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-emerald-600" />
                <h5 className="text-sm font-semibold text-gray-700">
                  NUsers List
                </h5>
              </div>
              {!loadingNusers && (
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                  {nusers.length} record{nusers.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white">
              {loadingNusers ? (
                /* Loading skeleton rows */
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
                      {["Full Name", "Firm Name", "Mobile", "Email","Action"].map(
                        (col) => (
                          <th
                            key={col}
                            className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-gray-400"
                          >
                            {col}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {nusers.length === 0 ? (
                      <tr>
                        <td
                          colSpan={4}
                          className="py-8 text-center text-sm text-gray-400"
                        >
                          No NUsers Found
                        </td>
                      </tr>
                    ) : (
                      nusers.map((nuser) => {
                        const initials = nuser.fullName
                          ?.split(" ")
                          .map((w) => w[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase();

                        return (
                          <tr
                            key={nuser._id}
                            className="transition-colors hover:bg-gray-50"
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2.5">
                                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-violet-50 text-[10px] font-semibold text-violet-800">
                                  {initials || "N"}
                                </div>
                                <span className="truncate text-sm font-medium text-gray-800">
                                  {nuser.fullName || "-"}
                                </span>
                              </div>
                            </td>
                            <td className="truncate px-4 py-3 text-sm font-medium text-gray-800">
                              {nuser.firmName || "-"}
                            </td>
                            <td className="px-4 py-3 text-sm font-medium text-gray-800">
                              {nuser.mobile || "-"}
                            </td>
                            <td className="truncate px-4 py-3 text-sm font-medium text-gray-800">
                              {nuser.email || "-"}
                            </td>

                             <button
                                onClick={() => handleViewNuser(nuser)}
                                className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-blue-50 text-blue-800 hover:bg-blue-100 transition-colors"
                              >
                                <Eye className="w-4 h-4 mr-2" />
                            
                              </button>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          {/* ── End NUsers Section ── */}
        </div>
      </div>

      {/* Nested Modal for viewing customers of an NUser */}
      <ViewNuserCustomerModal
        isOpen={isCustomerModalOpen}
        nuser={selectedNuser}
        onClose={() => {
          setIsCustomerModalOpen(false);
          setSelectedNuser(null);
        }}
      />
    </div>
  );
};

export default ViewDistributorModal;
