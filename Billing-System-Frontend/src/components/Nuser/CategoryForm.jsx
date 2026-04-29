import { useState } from "react";
import { X, FolderOpen, Loader2, Save } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";

const CategoryForm = ({ isOpen, onClose, refreshData }) => {
  const [formData, setFormData] = useState({
    categoryName: "",
    status: "active",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axiosInstance.post("/cetegoryapi/create", formData);
      refreshData();
      onClose();
      // Reset form
      setFormData({
        categoryName: "",
        status: "active",
      });
    } catch (err) {
      console.error("Create Error:", err);
      setError(err.response?.data?.message || "Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all bg-gray-50 focus:bg-white";
  const labelClass = "text-sm font-medium text-gray-700";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <FolderOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Add Category</h2>
                <p className="text-violet-100 text-sm">Create new category</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <label className={labelClass}>
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="categoryName"
                  value={formData.categoryName}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Enter category name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className={labelClass}>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-xl shadow-lg shadow-violet-500/30 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Create Category
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
