import { useState } from "react";
import { Pencil, Trash2, Loader2, X } from "lucide-react";

const BrandModal = ({ isOpen, onClose, brands, categoryName }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-violet-50/50">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Brands</h3>
            <p className="text-xs text-violet-600 font-medium uppercase tracking-wider">
              Category: {categoryName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white rounded-xl transition-colors text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-2">
            {brands.map((brand, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium text-gray-700"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const BrandList = ({ brands, categoryName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const limit = 2;
  const hasMore = brands.length > limit;

  const displayBrands = brands.slice(0, limit);

  return (
    <>
      <div className="flex items-center flex-wrap gap-1">
        {displayBrands.map((tag, idx) => (
          <span key={idx} className="text-sm text-black font-medium">
            {tag}
            {idx < displayBrands.length - 1 || hasMore ? ", " : ""}
          </span>
        ))}
        {hasMore && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
            className="text-xs text-black-600 font-bold hover:text-violet-800 bg-violet-50 px-2 py-0.5 rounded-lg transition-colors"
          >
            +{brands.length - limit} more
          </button>
        )}
      </div>
      <BrandModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        brands={brands}
        categoryName={categoryName}
      />
    </>
  );
};

const CommonTable = ({
  columns,
  data,
  loading,
  onEdit,
  onDelete,
  emptyIcon: EmptyIcon,
  tableHeader,
}) => {
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
      {tableHeader && (
        <div className="p-5 border-b border-gray-100 bg-white flex justify-between items-center">
          {tableHeader}
        </div>
      )}
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
                <td colSpan={columns.length + 1} className="py-16 text-center">
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
                    {EmptyIcon && (
                      <EmptyIcon className="w-8 h-8 text-gray-300" />
                    )}
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
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(item[col.key])}`}
                        >
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
                        <BrandList
                          brands={item[col.key]}
                          categoryName={item.name}
                        />
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
