import { X, User, Phone, Mail, MapPin, Building2, Map, FileText } from "lucide-react";

const FieldRow = ({ label, value }) => (
  <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
    <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
      {label}
    </p>
    <p className="mt-1 text-sm font-medium text-gray-800">{value || "-"}</p>
  </div>
);

const ViewCustomerModal = ({ isOpen, customer, onClose }) => {
  if (!isOpen || !customer) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">
              Customer Details
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              View complete information for this customer.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="max-h-[calc(90vh-88px)] overflow-y-auto px-6 py-6">
          <div className="grid gap-6 lg:grid-cols-2">
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-emerald-600" />
                <h5 className="text-sm font-semibold text-gray-700">
                  Basic Details
                </h5>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <FieldRow label="Customer Name" value={customer.customerName} />
                <FieldRow label="Status" value={customer.status} />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-600" />
                <h5 className="text-sm font-semibold text-gray-700">
                  Contact Details
                </h5>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <FieldRow label="Mobile" value={customer.mobile} />
                <FieldRow label="Email" value={customer.email} />
              </div>
            </div>

            <div className="space-y-4 lg:col-span-2">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-emerald-600" />
                <h5 className="text-sm font-semibold text-gray-700">
                  Business Details
                </h5>
              </div>
              <div className="grid gap-3 sm:grid-cols-4">
                <FieldRow label="GST Number" value={customer.gst} />
                <div className="sm:col-span-3">
                  <FieldRow label="Created By (NUser)" value={customer.nuserId?.fullName ? `${customer.nuserId.fullName} (${customer.nuserId.usercode || 'N/A'})` : "-"} />
                </div>
              </div>
            </div>

            <div className="space-y-4 lg:col-span-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-600" />
                <h5 className="text-sm font-semibold text-gray-700">
                  Location Details
                </h5>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="sm:col-span-2 lg:col-span-4">
                  <FieldRow label="Full Address" value={customer.address} />
                </div>
                <FieldRow label="Area" value={customer.area} />
                <FieldRow label="District" value={customer.district} />
                <FieldRow label="State" value={customer.state} />
                <FieldRow label="Pincode" value={customer.pincode} />
              </div>
            </div>

          </div>

          <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50 p-4">
            <div className="mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4 text-emerald-600" />
              <h5 className="text-sm font-semibold text-gray-700">
                System Info
              </h5>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              <p>
                <span className="font-medium text-gray-500">Added On:</span>{" "}
                {customer.createdAt ? new Date(customer.createdAt).toLocaleString() : "-"}
              </p>
              <p>
                <span className="font-medium text-gray-500">Last Updated:</span>{" "}
                {customer.updatedAt ? new Date(customer.updatedAt).toLocaleString() : "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCustomerModal;
