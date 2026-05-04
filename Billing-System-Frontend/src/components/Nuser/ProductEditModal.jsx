import { Loader2, Plus, Save, Trash2, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

const ProductEditModal = ({
  product,
  formData,
  editImages = [],
  retainedImages = [],
  editLoading,
  onClose,
  onChange,
  onImageChange,
  removeEditImage,
  onSubmit,
  getProductImageUrl,
  error,
}) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const catRes = await axiosInstance.get("/cetegoryapi/get");
        setCategories(catRes.data?.data || catRes.data || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

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

  if (!product) return null;

  const handleVariantChange = (index, e) => {
    const { name, value } = e.target;
    const newVariants = [...(formData.variants || [])];
    newVariants[index][name] = value;
    onChange({ target: { name: "variants", value: newVariants } });
  };

  const addVariant = () => {
    const newVariants = [
      ...(formData.variants || []),
      { sizeName: "", price: "", discountPrice: "", stock: "" },
    ];
    onChange({ target: { name: "variants", value: newVariants } });
  };

  const removeVariant = (index) => {
    if (formData.variants?.length > 1) {
      const newVariants = formData.variants.filter((_, i) => i !== index);
      onChange({ target: { name: "variants", value: newVariants } });
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100";
  const labelClass = "mb-1 block text-xs font-semibold text-gray-600";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 backdrop-blur-sm sm:p-4">
      <div className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 sm:px-5">
          <div className="min-w-0">
            <h2 className="text-base font-bold text-gray-900 sm:text-lg">
              Edit Product
            </h2>
            <p className="truncate text-xs text-gray-500">
              {product.productName}
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

        <form onSubmit={onSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-4 py-4 sm:px-5">
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className={labelClass}>Product Name *</label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={onChange}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Category</label>
                <select
                  name="categoryId"
                  value={formData.categoryId || ""}
                  onChange={onChange}
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

              <div>
                <label className={labelClass}>Brand</label>
                <select
                  name="brandId"
                  value={formData.brandId || ""}
                  onChange={onChange}
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
            </div>

            <div>
              <label className={labelClass}>Description</label>
              <textarea
                name="productDescription"
                value={formData.productDescription}
                onChange={onChange}
                rows={3}
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-bold text-gray-900">
                  Sizes & Pricing
                </h3>
                <button
                  type="button"
                  onClick={addVariant}
                  className="flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 transition-colors hover:bg-amber-100"
                >
                  <Plus className="h-4 w-4" />
                  Add Size
                </button>
              </div>

              <div className="space-y-3">
                {(formData.variants || []).map((variant, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-gray-200 bg-gray-50 p-3"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs font-bold uppercase text-gray-500">
                        Size {index + 1}
                      </span>
                      {formData.variants.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeVariant(index)}
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
                          value={variant.sizeName}
                          onChange={(e) => handleVariantChange(index, e)}
                          className={inputClass}
                          required
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Price *</label>
                        <input
                          type="number"
                          name="price"
                          value={variant.price}
                          onChange={(e) => handleVariantChange(index, e)}
                          className={inputClass}
                          required
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Discount Price</label>
                        <input
                          type="number"
                          name="discountPrice"
                          value={variant.discountPrice}
                          onChange={(e) => handleVariantChange(index, e)}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Stock *</label>
                        <input
                          type="number"
                          name="stock"
                          value={variant.stock}
                          onChange={(e) => handleVariantChange(index, e)}
                          className={inputClass}
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className={labelClass}>Product Images</label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {/* Retained Images */}
                {retainedImages.map((imgUrl, idx) => (
                  <div key={`retained-${idx}`} className="relative group rounded-lg border border-gray-200 aspect-square overflow-hidden bg-gray-50">
                    <img src={getProductImageUrl(imgUrl)} alt={`retained ${idx}`} className="h-full w-full object-cover" />
                    <button 
                      type="button" 
                      onClick={() => removeEditImage(idx, true)} 
                      className="absolute top-1.5 right-1.5 p-1 bg-red-500/90 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                      title="Remove image"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
                
                {/* New Images */}
                {editImages.map((file, idx) => (
                  <div key={`new-${idx}`} className="relative group rounded-lg border border-amber-200 aspect-square overflow-hidden bg-amber-50">
                    <img src={URL.createObjectURL(file)} alt={`new ${idx}`} className="h-full w-full object-cover" />
                    <button 
                      type="button" 
                      onClick={() => removeEditImage(idx, false)} 
                      className="absolute top-1.5 right-1.5 p-1 bg-red-500/90 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                      title="Remove new image"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                    <span className="absolute bottom-1 right-1 bg-amber-500 text-white text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">New</span>
                  </div>
                ))}

                {/* Add Image Button */}
                <label className="group relative cursor-pointer flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 bg-gray-50 transition-all hover:border-amber-500 hover:bg-amber-50/40 aspect-square">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 transition-colors group-hover:text-amber-600">
                    <Upload className="h-4 w-4" />
                  </div>
                  <p className="text-[10px] font-medium text-gray-500">Add Image</p>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={onImageChange}
                    className="hidden"
                  />
                </label>
              </div>
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
              disabled={editLoading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition-all hover:bg-amber-600 disabled:opacity-50 sm:w-auto"
            >
              {editLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {editLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEditModal;
