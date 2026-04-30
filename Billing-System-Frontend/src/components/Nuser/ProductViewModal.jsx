import { Package, X } from "lucide-react";

const ProductViewModal = ({
  product,
  onClose,
  getCategoryName,
  getBrandName,
  getStatusColor,
  getProductImageUrl,
  formatDate,
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative flex w-full max-w-2xl max-h-[90vh] flex-col bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="shrink-0 bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Product Details
                </h2>
                <p className="text-violet-100 text-sm">
                  {product.productName}
                </p>
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

        <div className="min-h-0 flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 uppercase">Product Name</p>
              <p className="font-semibold text-gray-800 break-words">
                {product.productName}
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 uppercase">Unit</p>
              <p className="font-semibold text-gray-800 capitalize">
                {product.productUnit}
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 uppercase">Price</p>
              <p className="font-semibold text-gray-800">
                Rs. {product.productPrice}
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 uppercase">Discount Price</p>
              <p className="font-semibold text-emerald-600">
                {product.discountPrice ? `Rs. ${product.discountPrice}` : "N/A"}
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 uppercase">Category</p>
              <p className="font-semibold text-gray-800 break-words">
                {getCategoryName(product)}
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 uppercase">Brand</p>
              <p className="font-semibold text-gray-800 break-words">
                {getBrandName(product)}
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 uppercase">Status</p>
              <span
                className={`inline-block mt-1 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  product.status,
                )}`}
              >
                {product.status}
              </span>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 uppercase">Created</p>
              <p className="font-semibold text-gray-800">
                {formatDate(product.createdAt)}
              </p>
            </div>
          </div>

          {product.productDescription && (
            <div className="p-3 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 uppercase">Description</p>
              <p className="text-sm text-gray-700 mt-1 break-words">
                {product.productDescription}
              </p>
            </div>
          )}

          {product.productImage && (
            <div className="p-3 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 uppercase mb-2">
                Product Image
              </p>
              <img
                src={getProductImageUrl(product.productImage)}
                alt={product.productName}
                className="w-32 h-32 object-cover rounded-xl"
              />
            </div>
          )}
        </div>

        <div className="shrink-0 px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductViewModal;
