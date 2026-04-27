import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";

const RecentTable = ({ title, icon: Icon, headers, data, type }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-700";
      case "inactive":
        return "bg-gray-100 text-gray-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  const getStockColor = (stock) => {
    if (stock <= 10) return "text-red-600 font-semibold";
    if (stock <= 30) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <MoreHorizontal className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={headers.length + 1}
                  className="px-6 py-8 text-center text-gray-500"
                >
                  No data available
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* Render cells based on table type */}
                  {type === "nusers" && (
                    <>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                            {row.name?.charAt(0) || "U"}
                          </div>
                          <span className="font-medium text-gray-800">
                            {row.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{row.mobile}</td>
                      <td className="px-6 py-4 text-gray-600">{row.email}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            row.status
                          )}`}
                        >
                          {row.status || "Active"}
                        </span>
                      </td>
                    </>
                  )}

                  {type === "products" && (
                    <>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                            {row.name?.charAt(0) || "P"}
                          </div>
                          <span className="font-medium text-gray-800">
                            {row.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                          {row.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {row.price}
                      </td>
                      <td className={`px-6 py-4 ${getStockColor(row.stock)}`}>
                        {row.stock} units
                      </td>
                    </>
                  )}

                  {type === "customers" && (
                    <>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                            {row.name?.charAt(0) || "C"}
                          </div>
                          <span className="font-medium text-gray-800">
                            {row.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{row.mobile}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          <span className="text-gray-600">{row.city}</span>
                        </div>
                      </td>
                    </>
                  )}

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
        <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
          View All →
        </button>
      </div>
    </div>
  );
};

export default RecentTable;
