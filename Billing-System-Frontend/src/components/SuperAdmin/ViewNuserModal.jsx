import { X, UserCircle, Building2, Mail, Phone, Landmark, BadgeCheck } from "lucide-react";

const InfoCard = ({ label, value }) => (
  <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
    <p className="text-xs font-medium uppercase tracking-wider text-gray-400">{label}</p>
    <p className="mt-1 text-sm font-medium text-gray-800">{value || "-"}</p>
  </div>
);

const ViewNuserModal = ({ isOpen, nuser, onClose }) => {
  if (!isOpen || !nuser) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Nuser Details</h3>
            <p className="mt-1 text-sm text-gray-500">View complete information for this nuser.</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[calc(90vh-88px)] overflow-y-auto px-6 py-6">
          <div className="mb-6 flex items-center gap-4 rounded-2xl bg-gradient-to-r from-violet-50 to-purple-50 p-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 text-lg font-bold text-white">
              {nuser.fullName
                ?.split(" ")
                .map((word) => word[0])
                .join("")
                .slice(0, 2)
                .toUpperCase() || "N"}
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800">{nuser.fullName}</h4>
              <p className="text-sm text-gray-500">{nuser.email || "No email available"}</p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <UserCircle className="h-4 w-4 text-violet-600" />
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
                <Mail className="h-4 w-4 text-violet-600" />
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
                <BadgeCheck className="h-4 w-4 text-violet-600" />
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
                <Landmark className="h-4 w-4 text-violet-600" />
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
        </div>
      </div>
    </div>
  );
};

export default ViewNuserModal;
