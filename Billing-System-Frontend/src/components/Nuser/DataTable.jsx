import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";

const DataTable = ({ title, icon: Icon, headers, data, type }) => {
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

  const renderCell = (row, header, index) => {
    const key = header.toLowerCase().replace(/\s+/g, '');
    
    // First column with avatar for all types
    if (index === 0) {
      let avatarColor = "from-blue-500 to-indigo-600";
      let initial = row.name?.charAt(0) || "?";
      
      if (type === "products") {
        avatarColor = "from-emerald-500 to-teal-600";
        initial = row.name?.charAt(0) || "P";
      } else if (type === "customers") {
        avatarColor = "from-purple-500 to-pink-600";
        initial = row.name?.charAt(0) || "C";
      } else if (type === "brands") {
        avatarColor = "from-orange-500 to-red-600";
        initial = row.name?.charAt(0) || "B";
      } else if (type === "categories") {
        avatarColor = "from-cyan-500 to-blue-600";
        initial = row.name?.charAt(0) || "C";
      }

      return (
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 bg-gradient-to-br ${avatarColor} rounded-lg flex items-center justify-center text-white text-sm font-bold`}>
              {initial}
            </div>
            <span className="font-medium text-gray-800">{row.name}</span>
          </div>
        </td>
      );
    }

    // Status column
    if (key.includes('status')) {
      return (
        <td className="px-6 py-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(row.status)}`}>
            {row.status || "Active"}
          </span>
        </td>
      );
    }

    // Stock column
    if (key.includes('stock')) {
      return (
        <td className={`px-6 py-4 ${getStockColor(row.stock)}`}>
          {row.stock} units
        </td>
      );
    }

    // Category column with badge
    if (key.includes('category')) {
      return (
        <td className="px-6 py-4">
          <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
            {row.category}
          </span>
        </td>
      );
    }

    // Default rendering
    const value = row[key] || row[header.toLowerCase()] || "-";
    return (
      <td className="px-6 py-4 text-gray-600">
        {value}
      </td>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
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
                  {headers.map((header, colIndex) => renderCell(row, header, colIndex))}
                  
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
        <button className="text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors">
          View All →
        </button>
      </div>
    </div>
  );
};

export default DataTable;
