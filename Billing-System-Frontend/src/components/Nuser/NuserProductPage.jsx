import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  Search,
  Package,
  Loader2,
  X,
  Save,
  Upload,
} from "lucide-react";
import axiosInstance from "../../api/axiosInstance";
import Sidebar from "./Sidebar";
import Header from "./Header";
import LogoutModal from "./LogoutModal";
import ProductForm from "./ProductForm";

const API_ORIGIN = "http://localhost:5000";

const NuserProductPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Modal states
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [editLoading, setEditLoading] = useState(false);
  const [editImage, setEditImage] = useState(null);

  // Dashboard states
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [user, setUser] = useState({
    name: "",
    role: "",
    email: "",
    mobile: "",
    businessName: "",
  });

  // Fetch user data
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser({
        name: userData.name || "Nuser",
        role: userData.role || "nuser",
        email: userData.email || "",
        mobile: userData.mobile || "",
        businessName: userData.businessName || userData.name || "",
      });
    }

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/productapi/get");
      const productData = res.data?.data || res.data || [];
      setProducts(productData);
      setFilteredProducts(productData);
    } catch (error) {
      console.error("Fetch Error:", error);
      // Sample data for development
      const sampleData = [
        {
          _id: "1",
          productName: "Rice Basmati",
          productDescription: "Premium quality basmati rice",
          productUnit: "kg",
          productPrice: 120,
          discountPrice: 110,
          category: "Grocery",
          brand: "India Gate",
          status: "active",
          productImage: null,
          createdAt: "2026-01-15T10:30:00Z",
        },
        {
          _id: "2",
          productName: "Sunflower Oil",
          productDescription: "Pure sunflower cooking oil",
          productUnit: "liter",
          productPrice: 180,
          discountPrice: null,
          category: "Grocery",
          brand: "Fortune",
          status: "active",
          productImage: null,
          createdAt: "2026-01-12T14:20:00Z",
        },
        {
          _id: "3",
          productName: "Wheat Flour",
          productDescription: "Whole wheat flour",
          productUnit: "kg",
          productPrice: 45,
          discountPrice: 40,
          category: "Grocery",
          brand: "Aashirvaad",
          status: "inactive",
          productImage: null,
          createdAt: "2026-01-10T09:15:00Z",
        },
        {
          _id: "4",
          productName: "Sugar",
          productDescription: "Refined white sugar",
          productUnit: "kg",
          productPrice: 55,
          discountPrice: null,
          category: "Grocery",
          brand: "Madhur",
          status: "active",
          productImage: null,
          createdAt: "2026-01-08T11:00:00Z",
        },
      ];
      setProducts(sampleData);
      setFilteredProducts(sampleData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (p) =>
          p.productName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          getCategoryName(p).toLowerCase().includes(searchQuery.toLowerCase()) ||
          getBrandName(p).toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.productDescription
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()),
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await axiosInstance.delete(`/productapi/delete/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Error deleting product");
    }
  };

  // View product
  const handleView = (product) => {
    setSelectedProduct(product);
    setIsViewOpen(true);
  };

  // Edit product
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditFormData({
      productName: product.productName || "",
      productDescription: product.productDescription || "",
      productUnit: product.productUnit || "kg",
      productPrice: product.productPrice || "",
      discountPrice: product.discountPrice || "",
      category: product.categoryId?._id || product.category || "",
      brand: product.brandId?._id || product.brand || "",
    });
    setEditImage(null);
    setIsEditOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditImageChange = (e) => {
    setEditImage(e.target.files[0]);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);

    try {
      const data = new FormData();
      Object.entries(editFormData).forEach(([key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
          data.append(key, value);
        }
      });
      if (editImage) {
        data.append("productImage", editImage);
      }

      await axiosInstance.put(`/productapi/update/${selectedProduct._id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchProducts();
      setIsEditOpen(false);
      setEditImage(null);
    } catch (err) {
      console.error("Update Error:", err);
      alert("Error updating product");
    } finally {
      setEditLoading(false);
    }
  };

  // Logout handlers
  const handleLogoutClick = () => setShowLogoutModal(true);
  const handleCancelLogout = () => setShowLogoutModal(false);
  const handleConfirmLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-emerald-100 text-emerald-700";
      case "inactive":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  //Img Url ==========================================
  const getProductImageUrl = (productImage) => {
    if (!productImage) return "";

    if (productImage.startsWith("http")) {
      return productImage;
    }

    if (productImage.startsWith("/uploads/")) {
      return `${API_ORIGIN}${productImage}`;
    }

    if (productImage.startsWith("uploads/")) {
      return `${API_ORIGIN}/${productImage}`;
    }

    if (productImage.startsWith("ProductImg/")) {
      return `${API_ORIGIN}/uploads/${productImage}`;
    }

    return `${API_ORIGIN}/uploads/ProductImg/${productImage}`;
  };

  const getCategoryName = (product) =>
    product.categoryId?.categoryName || product.category || "N/A";

  const getBrandName = (product) =>
    product.brandId?.brandName || product.brand || "N/A";

  const avatarColors = [
    "bg-violet-100 text-violet-700",
    "bg-purple-100 text-purple-700",
    "bg-fuchsia-100 text-fuchsia-700",
    "bg-indigo-100 text-indigo-700",
    "bg-blue-100 text-blue-700",
    "bg-emerald-100 text-emerald-700",
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 to-violet-50">
      <Sidebar
        user={user}
        onLogout={handleLogoutClick}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      <div className="flex-1 flex min-h-0 flex-col overflow-hidden">
        <Header
          user={user}
          onLogout={handleLogoutClick}
          currentTime={currentTime}
        />

        <main className="flex-1 min-h-0 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                  <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
                    <Package className="w-5 h-5 text-violet-600" />
                  </div>
                  Product Management
                </h1>
                <p className="text-gray-500 mt-1 ml-13">
                  Manage your products and inventory
                </p>
              </div>
              <button
                onClick={() => setIsProductFormOpen(true)}
                className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl shadow-lg shadow-violet-500/30 transition-all hover:shadow-xl"
              >
                <Plus className="w-5 h-5" />
                Add Product
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by product name, category or brand..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all bg-white"
              />
            </div>

            {/* Product Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Table Header */}
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">
                  Product List
                </h2>
                <span className="text-sm text-gray-500">
                  Total: {filteredProducts.length}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {[
                        "Product",
                        "Unit",
                        "Price",
                        "Discount",
                        "Category",
                        "Brand",
                        "Status",
                        "Actions",
                      ].map((h) => (
                        <th
                          key={h}
                          className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {loading ? (
                      <tr>
                        <td colSpan="8" className="py-12 text-center">
                          <Loader2 className="w-8 h-8 animate-spin mx-auto text-violet-600" />
                        </td>
                      </tr>
                    ) : filteredProducts.length === 0 ? (
                      <tr>
                        <td
                          colSpan="8"
                          className="py-12 text-center text-gray-500"
                        >
                          <div className="flex flex-col items-center gap-2">
                            <Package className="w-12 h-12 text-gray-300" />
                            <p>No products found</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((product, index) => {
                        const avatarColor =
                          avatarColors[index % avatarColors.length];

                        return (
                          <tr
                            key={product._id}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            
                            {/* Product */}
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-20 h-20 rounded-xl flex items-center justify-center overflow-hidden  ${avatarColor}`}
                                >
                                  {product.productImage ? (
                                    <img
                                      src={getProductImageUrl(
                                        product.productImage,
                                      )}
                                      alt={product.productName}
                                      className="w-full h-full object-cover rounded-xl"
                                    />
                                  ) : (
                                    <Package className="w-5 h-5" />
                                  )}
                                </div>
                                <div>
                                  <p className="font-medium text-gray-800">
                                    {product.productName}
                                  </p>
                                  {/* <p className="text-xs text-gray-500 truncate max-w-[200px]">
                                    {product.productDescription}
                                  </p> */}
                                </div>
                              </div>
                            </td>

                            {/* Unit */}
                            <td className="px-4 py-4">
                              <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium capitalize">
                                {product.productUnit}
                              </span>
                            </td>

                            {/* Price */}
                            <td className="px-4 py-4">
                              <span className="font-semibold text-gray-800">
                                ₹{product.productPrice}
                              </span>
                            </td>

                            {/* Discount Price */}
                            <td className="px-4 py-4">
                              {product.discountPrice ? (
                                <span className="font-semibold text-emerald-600">
                                  ₹{product.discountPrice}
                                </span>
                              ) : (
                                <span className="text-gray-400 text-sm">-</span>
                              )}
                            </td>

                            {/* Category */}
                            <td className="px-4 py-4 text-sm text-gray-600">
                              {getCategoryName(product)}
                            </td>

                            {/* Brand */}
                            <td className="px-4 py-4 text-sm text-gray-600">
                              {getBrandName(product)}
                            </td>

                            {/* Status */}
                            <td className="px-4 py-4">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                  product.status,
                                )}`}
                              >
                                {product.status || "Active"}
                              </span>
                            </td>

                            {/* Actions */}
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleView(product)}
                                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  View
                                </button>
                                <button
                                  onClick={() => handleEdit(product)}
                                  className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-xs font-medium hover:bg-amber-100 transition-colors"
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(product._id)}
                                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Product Form Modal */}
      <ProductForm
        isOpen={isProductFormOpen}
        onClose={() => setIsProductFormOpen(false)}
        refreshData={fetchProducts}
      />

      {/* View Modal */}
      {isViewOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsViewOpen(false)}
          />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-4">
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
                      {selectedProduct.productName}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsViewOpen(false)}
                  className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 uppercase">
                    Product Name
                  </p>
                  <p className="font-semibold text-gray-800">
                    {selectedProduct.productName}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 uppercase">Unit</p>
                  <p className="font-semibold text-gray-800 capitalize">
                    {selectedProduct.productUnit}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 uppercase">Price</p>
                  <p className="font-semibold text-gray-800">
                    ₹{selectedProduct.productPrice}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 uppercase">
                    Discount Price
                  </p>
                  <p className="font-semibold text-emerald-600">
                    {selectedProduct.discountPrice
                      ? `₹${selectedProduct.discountPrice}`
                      : "N/A"}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 uppercase">Category</p>
                  <p className="font-semibold text-gray-800">
                    {getCategoryName(selectedProduct)}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 uppercase">Brand</p>
                  <p className="font-semibold text-gray-800">
                    {getBrandName(selectedProduct)}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 uppercase">Status</p>
                  <span
                    className={`inline-block mt-1 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      selectedProduct.status,
                    )}`}
                  >
                    {selectedProduct.status}
                  </span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 uppercase">Created</p>
                  <p className="font-semibold text-gray-800">
                    {formatDate(selectedProduct.createdAt)}
                  </p>
                </div>
              </div>

              {selectedProduct.productDescription && (
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 uppercase">Description</p>
                  <p className="text-sm text-gray-700 mt-1">
                    {selectedProduct.productDescription}
                  </p>
                </div>
              )}

              {selectedProduct.productImage && (
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 uppercase mb-2">
                    Product Image
                  </p>
                  <img
                    src={getProductImageUrl(selectedProduct.productImage)}
                    alt={selectedProduct.productName}
                    className="w-32 h-32 object-cover rounded-xl"
                  />
                </div>
              )}
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setIsViewOpen(false)}
                className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsEditOpen(false)}
          />
          <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Pencil className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      Edit Product
                    </h2>
                    <p className="text-orange-100 text-sm">
                      {selectedProduct.productName}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditOpen(false)}
                  className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleEditSubmit}
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
                      value={editFormData.productName}
                      onChange={handleEditChange}
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
                      value={editFormData.productUnit}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all bg-gray-50 focus:bg-white"
                    >
                      <option value="kg">kg</option>
                      <option value="gram">gram</option>
                      <option value="liter">liter</option>
                      <option value="ml">ml</option>
                      <option value="piece">piece</option>
                      <option value="box">box</option>
                      <option value="packet">packet</option>
                      <option value="bottle">bottle</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Price (₹) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="productPrice"
                      value={editFormData.productPrice}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all bg-gray-50 focus:bg-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Discount Price (₹)
                    </label>
                    <input
                      type="number"
                      name="discountPrice"
                      value={editFormData.discountPrice}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all bg-gray-50 focus:bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={editFormData.category}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all bg-gray-50 focus:bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Brand
                    </label>
                    <input
                      type="text"
                      name="brand"
                      value={editFormData.brand}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all bg-gray-50 focus:bg-white"
                    />
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      name="productDescription"
                      value={editFormData.productDescription}
                      onChange={handleEditChange}
                      rows="3"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all bg-gray-50 focus:bg-white resize-none"
                    />
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium text-gray-700">
                      Product Image
                    </label>
                    <div className="flex items-center gap-4">
                      {selectedProduct.productImage && !editImage && (
                        <img
                          src={getProductImageUrl(selectedProduct.productImage)}
                          alt={selectedProduct.productName}
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
                          onChange={handleEditImageChange}
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
                  onClick={() => setIsEditOpen(false)}
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
      )}

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        userName={user.name}
        onCancel={handleCancelLogout}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
};

export default NuserProductPage;
