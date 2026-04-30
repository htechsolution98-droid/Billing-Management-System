import { Loader2, Pencil, Save, Upload, X } from "lucide-react";

const ProductEditModal = ({
  product,
  formData,
  editImage,
  editLoading,
  onClose,
  onChange,
  onImageChange,
  onSubmit,
  getProductImageUrl,
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Pencil className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Edit Product</h2>
                <p className="text-orange-100 text-sm">{product.productName}</p>
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

        <form
          onSubmit={onSubmit}
          className="overflow-y-auto max-h-[calc(90vh-80px)]"
        >
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={onChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all bg-gray-50 focus:bg-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Unit
                </label>
                <select
                  name="productUnit"
                  value={formData.productUnit}
                  onChange={onChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all bg-gray-50 focus:bg-white"
                >
                  <option value="kg">kg</option>
                  <option value="gm">gm</option>
                  <option value="liter">liter</option>
                  <option value="ml">ml</option>
                  <option value="piece">piece</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Price (Rs.) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="productPrice"
                  value={formData.productPrice}
                  onChange={onChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all bg-gray-50 focus:bg-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Discount Price (Rs.)
                </label>
                <input
                  type="number"
                  name="discountPrice"
                  value={formData.discountPrice}
                  onChange={onChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all bg-gray-50 focus:bg-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Category
                </label>
                <input
                  type="text"
                  name="categoryName"
                  value={formData.categoryName || ""}
                  readOnly
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all bg-gray-50 focus:bg-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Brand
                </label>
                <input
                  type="text"
                  name="brandName"
                  value={formData.brandName || ""}
                  readOnly
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all bg-gray-50 focus:bg-white"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="productDescription"
                  value={formData.productDescription}
                  onChange={onChange}
                  rows="3"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all bg-gray-50 focus:bg-white resize-none"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  Product Image
                </label>
                <div className="flex items-center gap-4">
                  {product.productImage && !editImage && (
                    <img
                      src={getProductImageUrl(product.productImage)}
                      alt={product.productName}
                      className="w-16 h-16 object-cover rounded-xl border border-gray-200"
                    />
                  )}
                  {editImage && (
                    <img
                      src={URL.createObjectURL(editImage)}
                      alt="Preview"
                      className="w-16 h-16 object-cover rounded-xl border border-gray-200"
                    />
                  )}
                  <label className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl cursor-pointer transition-colors text-sm font-medium">
                    <Upload className="w-4 h-4" />
                    Choose New Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={onImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={editLoading}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium rounded-xl shadow-lg shadow-amber-500/30 transition-all disabled:opacity-50"
            >
              {editLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
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
