import { useState, useEffect } from "react";
import { X, Package, Upload, Loader2, Save } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";

const ProductForm = ({ isOpen, onClose, refreshData }) => {
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    productUnit: "kg",
    productPrice: "",
    discountPrice: "",
    categoryId: "",
    brandId: "",
    // status: "active",
  });
  const [productImage, setProductImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  // Fetch categories when form opens
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const catRes = await axiosInstance.get("/cetegoryapi/get");
        // console.log(catRes);
        
        setCategories(catRes.data?.data || catRes.data || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  // Fetch brands when category changes
  useEffect(() => {
    const fetchBrands = async () => {
      if (!formData.categoryId) {
        setBrands([]);
        return;
      }
      try {
        const brandRes = await axiosInstance.get(`/barndapi/brand/by-category/${formData.categoryId}`);
        setBrands(brandRes.data?.data || brandRes.data || []);
      } catch (err) {
        console.error("Error fetching brands by category:", err);
        setBrands([]);
      }
    };
    fetchBrands();
  }, [formData.categoryId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "categoryId" ? { brandId: "" } : {}),
    }));
  };

  const handleFileChange = (e) => {
    setProductImage(e.target.files[0]);
    console.log("imgsddsdsd", e.target.files[0]);
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== "" && formData[key] !== null) {
          data.append(key, formData[key]);
        }
      });
      if (productImage) {
        data.append("productImage", productImage);
      }

    const productres=   await axiosInstance.post("/productapi/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("productres",productres);
      

      refreshData();
      onClose();
      // Reset form
      setFormData({
        productName: "",
        productDescription: "",
        productUnit: "kg",
        productPrice: "",
        discountPrice: "",
        categoryId: "",
        brandId: "",
        // status: "active",
      });
      setProductImage(null);
    } catch (err) {
      console.error("Create Error:", err);
      setError(err.response?.data?.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
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
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Add Product</h2>
                <p className="text-violet-100 text-sm">Create new product</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto max-h-[calc(90vh-80px)]"
        >
          <div className="p-6 space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <label className={labelClass}>
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className={labelClass}>
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="productDescription"
                  value={formData.productDescription}
                  onChange={handleChange}
                  rows={3}
                  className={inputClass}
                  placeholder="Enter product description"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className={labelClass}>
                  Unit <span className="text-red-500">*</span>
                </label>
                <select
                  name="productUnit"
                  value={formData.productUnit}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="kg">Kilogram (kg)</option>
                  <option value="gm">Gram (gm)</option>
                  <option value="liter">Liter</option>
                  <option value="ml">Milliliter (ml)</option>
                  <option value="piece">Piece</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className={labelClass}>
                  Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="productPrice"
                  value={formData.productPrice}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Enter price"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className={labelClass}>Discount Price (₹)</label>
                <input
                  type="number"
                  name="discountPrice"
                  value={formData.discountPrice}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Enter discount price"
                />
              </div>

              <div className="space-y-2">
                <label className={labelClass}>Category </label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.categoryName || cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className={labelClass}>Brand </label>
                <select
                  name="brandId"
                  value={formData.brandId}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select Brand</option>
                  {brands.map((brand) => (
                    <option key={brand._id} value={brand._id}>
                      {brand.brandName || brand.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* <div className="space-y-2">
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
              </div> */}

              <br />

              <div className="space-y-2">
                <label className={labelClass}>
                  <Upload className="w-4 h-4 inline mr-1" />
                  Product Image
                </label>
                <input
                  type="file"
                  name="productImage"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-violet-50 file:text-violet-600 hover:file:bg-violet-100"
                />
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
                  Create Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
