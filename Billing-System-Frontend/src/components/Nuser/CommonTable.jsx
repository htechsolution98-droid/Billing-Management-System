import { Pencil, Trash2, Loader2 } from "lucide-react";

const CommonTable = ({ columns, data, loading, onEdit, onDelete, emptyIcon: EmptyIcon }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-emerald-100 text-emerald-700";
      case "inactive":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                  {col.label}
                </th>
              ))}
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="py-16 text-center"
                >
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-violet-600" />
                  <p className="text-sm text-gray-400 mt-2">Loading data...</p>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="py-16 text-center text-gray-500"
                >
                  <div className="flex flex-col items-center gap-3">
                    {EmptyIcon && <EmptyIcon className="w-14 h-14 text-gray-300" />}
                    <p className="text-gray-400 font-medium">No records found</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr
                  key={item._id || index}
                  className="hover:bg-gray-50/80 transition-colors"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-5 py-4">
                      {col.key === "status" ? (
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                            item[col.key]
                          )}`}
                        >
                          {item[col.key] || "Active"}
                        </span>
                      ) : col.key === "name" ? (
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center text-sm font-bold">
                            {(item[col.key] || "?").charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-gray-800">
                            {item[col.key] || "N/A"}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-600">
                          {item[col.key] || "N/A"}
                        </span>
                      )}
                    </td>
                  ))}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEdit(item)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-xs font-medium hover:bg-amber-100 transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(item._id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
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
