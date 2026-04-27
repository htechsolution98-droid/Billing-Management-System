import { X, UserCircle, Phone, Mail, MapPin, BadgeCheck, ShoppingCart } from "lucide-react";

const InfoCard = ({ label, value }) => (
  <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
    <p className="text-xs font-medium uppercase tracking-wider text-gray-400">{label}</p>
    <p className="mt-1 text-sm font-medium text-gray-800">{value || "-"}</p>
  </div>
);

const CustomerViewModal = ({ isOpen, customer, onClose }) => {
  if (!isOpen || !customer) return null;

  const initials =
    customer.customerName
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "C";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Customer Details</h3>
            <p className="mt-0.5 text-sm text-gray-500">Full information for this customer.</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[calc(90vh-80px)] overflow-y-auto px-6 py-6 space-y-6">
          {/* Avatar banner */}
          <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-purple-50 to-violet-50 p-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-600 text-lg font-bold text-white">
              {initials}
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800">{customer.customerName}</h4>
              <p className="text-sm text-gray-500">{customer.email || "No email provided"}</p>
              <span
                className={`mt-1 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  customer.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {customer.status || "active"}
              </span>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-purple-600" />
              <h5 className="text-sm font-semibold text-gray-700">Contact Details</h5>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <InfoCard label="Customer Name" value={customer.customerName} />
              <InfoCard label="Mobile" value={customer.mobile} />
              <InfoCard label="Email" value={customer.email} />
              <InfoCard label="GST Number" value={customer.gst} />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-purple-600" />
              <h5 className="text-sm font-semibold text-gray-700">Address Details</h5>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <InfoCard label="Address" value={customer.address} />
              <InfoCard label="Area" value={customer.area} />
              <InfoCard label="District" value={customer.district} />
              <InfoCard label="State" value={customer.state} />
              <InfoCard label="Pincode" value={customer.pincode} />
            </div>
          </div>

          {/* Meta */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-purple-600" />
              <h5 className="text-sm font-semibold text-gray-700">Other Info</h5>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <InfoCard label="Status" value={customer.status} />
              <InfoCard label="UserCode" value={customer.nuserId.usercode} />
              <InfoCard label="Created On" value={customer.createdAt?.slice(0, 10)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerViewModal;
