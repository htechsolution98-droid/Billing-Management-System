import { useEffect, useRef, useState } from "react";
import { Loader2, Plus, Trash2, Upload, X } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";

const ProductForm = ({ isOpen, onClose, refreshData }) => {
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    categoryId: "",
    brandId: "",
  });
  const [sizes, setSizes] = useState([
    { sizeName: "", price: "", discountPrice: "", stock: "" },
  ]);
  const [productImages, setProductImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const catRes = await axiosInstance.get("/cetegoryapi/get");
        setCategories(catRes.data?.data || catRes.data || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchBrands = async () => {
      if (!formData.categoryId) {
        setBrands([]);
        return;
      }

      try {
        const brandRes = await axiosInstance.get(
          `/barndapi/brand/by-category/${formData.categoryId}`,
        );
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

  const handleSizeChange = (index, e) => {
    const { name, value } = e.target;
    const newSizes = [...sizes];
    newSizes[index][name] = value;
    setSizes(newSizes);
  };

  const addSize = () => {
    setSizes([
      ...sizes,
      { sizeName: "", price: "", discountPrice: "", stock: "" },
    ]);
  };

  const removeSize = (index) => {
    if (sizes.length > 1) {
      setSizes(sizes.filter((_, i) => i !== index));
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setProductImages((prev) => [...prev, ...files]);
    
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
    // Clear input so same file can be selected again
    e.target.value = "";
  };

  const removeImage = (index) => {
    setProductImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setFormData({
      productName: "",
      productDescription: "",
      categoryId: "",
      brandId: "",
    });
    setSizes([{ sizeName: "", price: "", discountPrice: "", stock: "" }]);
    setProductImages([]);
    setImagePreviews([]);
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

      data.append("variants", JSON.stringify(sizes));

      if (productImages.length > 0) {
        productImages.forEach((img) => data.append("productImage", img));
      }

      await axiosInstance.post("/productapi/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      refreshData();
      onClose();
      resetForm();
    } catch (err) {
      console.error("Create Error:", err);
      setError(err.response?.data?.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100";
  const labelClass = "mb-1 block text-xs font-semibold text-gray-600";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 backdrop-blur-sm sm:p-4">
      <div className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 sm:px-5">
          <div>
            <h2 className="text-base font-bold text-gray-900 sm:text-lg">
              Add Product
            </h2>
            <p className="text-xs text-gray-500">
              Enter product details and stock.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-4 py-4 sm:px-5">
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <div>
              <label className={labelClass}>Product Images</label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {imagePreviews.map((preview, idx) => (
                  <div key={idx} className="relative group rounded-lg border border-gray-200 aspect-square overflow-hidden bg-gray-50">
                    <img src={preview} alt={`preview ${idx}`} className="h-full w-full object-cover" />
                    <button 
                      type="button" 
                      onClick={() => removeImage(idx)} 
                      className="absolute top-1.5 right-1.5 p-1 bg-red-500/90 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="group relative cursor-pointer flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 bg-gray-50 transition-all hover:border-violet-500 hover:bg-violet-50/40 aspect-square"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 transition-colors group-hover:text-violet-600">
                    <Upload className="h-4 w-4" />
                  </div>
                  <p className="text-[10px] font-medium text-gray-500">Add Image</p>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  multiple
                  className="hidden"
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Product Name *</label>
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

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Category *</label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.categoryName || cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Brand *</label>
                <select
                  name="brandId"
                  value={formData.brandId}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="">Select Brand</option>
                  {brands.map((brand) => (
                    <option key={brand._id} value={brand._id}>
                      {brand.brandName || brand.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <label className={labelClass}>
                  Sizes & Pricing *
                </label>
                <button
                  type="button"
                  onClick={addSize}
                  className="flex items-center gap-1.5 rounded-lg border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700 transition-colors hover:bg-violet-100"
                >
                  <Plus className="h-4 w-4" />
                  Add Size
                </button>
              </div>

              <div className="space-y-3">
                {sizes.map((size, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-gray-200 bg-gray-50 p-3"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs font-bold uppercase text-gray-500">
                        Size {index + 1}
                      </span>
                      {sizes.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSize(index)}
                          className="rounded-lg p-1.5 text-gray-400 transition-all hover:bg-red-50 hover:text-red-500"
                          aria-label={`Remove size ${index + 1}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                      <div>
                        <label className={labelClass}>Size *</label>
                        <input
                          type="text"
                          name="sizeName"
                          value={size.sizeName}
                          onChange={(e) => handleSizeChange(index, e)}
                          className={inputClass}
                          placeholder="5kg"
                          required
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Price *</label>
                        <input
                          type="number"
                          name="price"
                          value={size.price}
                          onChange={(e) => handleSizeChange(index, e)}
                          className={inputClass}
                          placeholder="0"
                          required
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Discount</label>
                        <input
                          type="number"
                          name="discountPrice"
                          value={size.discountPrice}
                          onChange={(e) => handleSizeChange(index, e)}
                          className={inputClass}
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Stock *</label>
                        <input
                          type="number"
                          name="stock"
                          value={size.stock}
                          onChange={(e) => handleSizeChange(index, e)}
                          className={inputClass}
                          placeholder="0"
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className={labelClass}>Description *</label>
              <textarea
                name="productDescription"
                value={formData.productDescription}
                onChange={handleChange}
                rows={3}
                className={`${inputClass} resize-none`}
                placeholder="Enter product description"
                required
              />
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50 px-4 py-3 sm:flex-row sm:justify-end sm:px-5">
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-lg border border-gray-200 bg-white px-5 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-100 sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-violet-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:bg-violet-700 disabled:opacity-50 sm:w-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
