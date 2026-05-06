import { useEffect, useState } from "react";
import { X, Users, Phone, Mail, MapPin } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";

const ViewNuserCustomerModal = ({ isOpen, nuser, onClose }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !nuser?._id) return;

    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/customerapi/nuser/${nuser._id}`);
        setCustomers(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch Customers:", error);
        setCustomers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();

    return () => setCustomers([]);
  }, [isOpen, nuser?._id]);

  if (!isOpen || !nuser) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5 shrink-0">
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              Customers for {nuser.fullName}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              View all customers associated with this NUser.
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
        <div className="overflow-y-auto px-6 py-6 flex-1 bg-gray-50/50">
          <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
            <div className="border-b border-gray-100 bg-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-indigo-600" />
                <h4 className="font-semibold text-gray-800">Customer List</h4>
              </div>
              {!loading && (
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 border border-indigo-100">
                  {customers.length} Total
                </span>
              )}
            </div>

            <div className="overflow-x-auto">
              {loading ? (
                <div className="space-y-3 p-6">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-12 w-full animate-pulse rounded-xl bg-gray-100"
                    />
                  ))}
                </div>
              ) : customers.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-gray-50 p-4 mb-4">
                    <Users className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-900">
                    No Customers Found
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    This NUser hasn't added any customers yet.
                  </p>
                </div>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 w-16">ID</th>
                      {[
                        "Customer Name",
                        "Contact Details",
                        "Location",
                        "Status",
                      ].map((header) => (
                        <th
                          key={header}
                          className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {customers.map((customer, index) => (
                      <tr
                        key={customer._id}
                        className="transition-colors hover:bg-gray-50/80"
                      >
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-gray-400">
                          #{index + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-sm font-bold text-indigo-700">
                              {customer.customerName?.charAt(0).toUpperCase() ||
                                "C"}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">
                                {customer.customerName}
                              </div>
                              <div className="text-xs text-gray-500 mt-0.5">
                                GST: {customer.gst || "N/A"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1.5">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Phone className="h-3.5 w-3.5 text-gray-400" />
                              {customer.mobile}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Mail className="h-3.5 w-3.5 text-gray-400" />
                              <span className="truncate max-w-[150px]">
                                {customer.email || "N/A"}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                            <div>
                              <div className="text-sm font-medium text-gray-700">
                                {customer.area || "-"},{" "}
                                {customer.district || "-"}
                              </div>
                              <div className="text-xs text-gray-500 mt-0.5">
                                {customer.state || "-"} -{" "}
                                {customer.pincode || "-"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium border ${
                              customer.status?.toLowerCase() === "active"
                                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                : "border-red-200 bg-red-50 text-red-700"
                            }`}
                          >
                            <span
                              className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                                customer.status?.toLowerCase() === "active"
                                  ? "bg-emerald-500"
                                  : "bg-red-500"
                              }`}
                            ></span>
                            {customer.status || "Active"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewNuserCustomerModal;
