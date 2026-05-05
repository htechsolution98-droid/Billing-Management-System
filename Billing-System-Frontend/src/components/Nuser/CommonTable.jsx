import { Pencil, Trash2, Loader2 } from "lucide-react";

const CommonTable = ({ columns, data, loading, onEdit, onDelete, emptyIcon: EmptyIcon, tableHeader }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
      case "delivered":
        return "bg-green-100 text-green-700";
      case "inactive":
      case "pendingpayment":
        return "bg-gray-100 text-gray-700";
      case "placed":
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {tableHeader && <div className="p-5 border-b border-gray-100 bg-white flex justify-between items-center">{tableHeader}</div>}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-4 text-sm font-semibold text-gray-900 capitalize"
                >
                  {col.label}
                </th>
              ))}
              <th className="px-6 py-4 text-sm font-semibold text-gray-900 capitalize">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="py-16 text-center"
                >
                  <Loader2 className="w-6 h-6 animate-spin mx-auto text-gray-400" />
                  <p className="text-sm text-gray-500 mt-2">Loading data...</p>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="py-16 text-center text-gray-500"
                >
                  <div className="flex flex-col items-center gap-2">
                    {EmptyIcon && <EmptyIcon className="w-8 h-8 text-gray-300" />}
                    <p className="text-sm font-medium">No records found</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr
                  key={item._id || index}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-4">
                      {col.key === "status" ? (
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(item[col.key])}`}>
                          {item[col.key] || "Active"}
                        </span>
                      ) : col.key === "name" ? (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-900 w-6 font-bold">
                            #{index + 1}
                          </span>
                          <span className="text-sm text-black  font-medium">
                            {item[col.key] || "N/A"}
                          </span>
                        </div>
                      ) : Array.isArray(item[col.key]) ? (
                        <div className="flex flex-wrap gap-1">
                          {item[col.key].map((tag, idx) => (
                            <span key={idx} className="text-sm text-black font-medium">
                              {tag}{idx < item[col.key].length - 1 ? ", " : ""}
                            </span>
                          ))}
                        </div>
                      ) : col.key === "categoryName" ? (
                        <span className="text-sm text-black  font-medium">
                          {item[col.key] || "N/A"}
                        </span>
                      ) : (
                        <span className="text-sm text-black font-medium">
                          {item[col.key] || "N/A"}
                        </span>
                      )}
                    </td>
                  ))}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => onEdit(item)}
                        className="flex items-center gap-1.5 text-black hover:text-amber-600 transition-colors font-semibold text-sm"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(item._id)}
                        className="flex items-center gap-1.5 text-black hover:text-red-600 transition-colors font-semibold text-sm"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommonTable;
