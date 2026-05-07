import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import { X, Plus, Pencil, Loader2, Save } from "lucide-react";

const CommonModalForm = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  subtitle,
  icon: Icon,
  editMode,
  initialData,
  loading,
}) => {
  const isBrand = title === "Brand";
  const [formData, setFormData] = useState({
    name: "",
    status: "active",
    categoryId: "",
    subcategories: [],
  });
  const [subInput, setSubInput] = useState("");
  const [categories, setCategories] = useState([]);
  const [catLoading, setCatLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (editMode && initialData) {
        setFormData({
          name: initialData.brandName || initialData.categoryName || initialData.name || "",
          status: initialData.status || "active",
          categoryId: initialData.categoryId?._id || initialData.categoryId || "",
          subcategories: initialData.subcategories || [],
        });
      } else {
        setFormData({ name: "", status: "active", categoryId: "", subcategories: [] });
      }

      // Fetch categories when Brand form opens
      if (isBrand) {
        setCatLoading(true);
        axiosInstance
          .get("/cetegoryapi/get")
          .then((res) => setCategories(res.data?.data || res.data || []))
          .catch((err) => console.error("Failed to load categories:", err))
          .finally(() => setCatLoading(false));
      }
    }
  }, [isOpen, editMode, initialData, isBrand]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addSubcategory = () => {
    if (!subInput.trim()) return;
    if (formData.subcategories.includes(subInput.trim())) {
      setSubInput("");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      subcategories: [...prev.subcategories, subInput.trim()],
    }));
    setSubInput("");
  };

  const removeSubcategory = (index) => {
    setFormData((prev) => ({
      ...prev,
      subcategories: prev.subcategories.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all bg-gray-50 focus:bg-white";
  const labelClass = "text-sm font-medium text-gray-700";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center">
                {editMode ? (
                  <Pencil className="w-5 h-5 text-white" />
                ) : (
                  <Plus className="w-5 h-5 text-white" />
                )}
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">
                  {editMode ? `Edit ${title}` : `Add New ${title}`}
                </h2>
                <p className="text-violet-100 text-sm">
                  {subtitle || `${editMode ? "Update" : "Create new"} ${title.toLowerCase()}`}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-2">
            <label className={labelClass}>
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
              placeholder={`Enter ${title.toLowerCase()} name`}
              required
              autoFocus
            />
          </div>

          {/* Category dropdown — only shown for Brand */}
          {isBrand && (
            <div className="space-y-2">
              <label className={labelClass}>
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className={inputClass}
                required
              >
                <option value="">
                  {catLoading ? "Loading categories..." : "Select Category"}
                </option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.categoryName || cat.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {!isBrand && (
            <div className="space-y-3">
              <label className={labelClass}>Subcategories</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={subInput}
                  onChange={(e) => setSubInput(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addSubcategory())
                  }
                  className={inputClass}
                  placeholder="Add subcategory (e.g. Basmati)"
                />
                <button
                  type="button"
                  onClick={addSubcategory}
                  className="px-4 py-2 bg-violet-100 text-violet-600 rounded-xl hover:bg-violet-200 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {formData.subcategories.length > 0 && (
                <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  {formData.subcategories.map((sub, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 shadow-sm"
                    >
                      {sub}
                      <button
                        type="button"
                        onClick={() => removeSubcategory(index)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

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

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-xl shadow-lg shadow-violet-500/30 transition-all disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : editMode ? (
                <Save className="w-5 h-5" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
              {loading ? "Saving..." : editMode ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommonModalForm;
