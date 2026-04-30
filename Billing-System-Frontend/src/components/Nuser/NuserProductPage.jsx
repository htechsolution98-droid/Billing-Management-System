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
} from "lucide-react";
import axiosInstance from "../../api/axiosInstance";
import Sidebar from "./Sidebar";
import Header from "./Header";
import LogoutModal from "./LogoutModal";
import ProductForm from "./ProductForm";
import ProductViewModal from "./ProductViewModal";
import ProductEditModal from "./ProductEditModal";

const API_ORIGIN = "http://localhost:5000";

const NuserProductPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

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

  // Fetch products*******************************************
  const fetchProducts = async (page = 1, search = searchQuery) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: String(page),
        limit: String(itemsPerPage),
      });

      if (search.trim()) {
        params.set("search", search.trim());
      }

      const res = await axiosInstance.get(`/productapi/get?${params}`);

      const productData = res.data?.data || [];
      setProducts(productData);
      setFilteredProducts(productData);
      
      if (res.data?.totalPages) setTotalPages(res.data.totalPages);
      if (res.data?.total !== undefined) setTotalItems(res.data.total);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts(currentPage, searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [currentPage, searchQuery]);

  // Reset to first page only when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // // Update filtered products when products or search query changes
  // useEffect(() => {
  //   if (searchQuery.trim() === "") {
  //     setFilteredProducts(products);
  //   } else {
  //     const filtered = products.filter(
  //       (p) =>
  //         p.productName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //         getCategoryName(p)
  //           .toLowerCase()
  //           .includes(searchQuery.toLowerCase()) ||
  //         getBrandName(p).toLowerCase().includes(searchQuery.toLowerCase()) ||
  //         p.productDescription
  //           ?.toLowerCase()
  //           .includes(searchQuery.toLowerCase()),
  //     );
  //     setFilteredProducts(filtered);
  //   }
  // }, [searchQuery, products]);

  // Delete product*******************************************
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await axiosInstance.delete(`/productapi/product/delete/${id}`);
      fetchProducts(currentPage);
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
      categoryId: product.categoryId?._id || "",
      categoryName:
        product.categoryId?.categoryName || product.category || "N/A",
      brandId: product.brandId?._id || "",
      brandName: product.brandId?.brandName || product.brand || "N/A",
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

  // Submit edit product*******************************************
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);

    try {
      const data = new FormData();
      Object.entries(editFormData).forEach(([key, value]) => {
        if (
          !["categoryName", "brandName"].includes(key) &&
          value !== "" &&
          value !== null &&
          value !== undefined
        ) {
          data.append(key, value);
        }
      });
      if (editImage) {
        data.append("productImage", editImage);
      }

     const editproduct =  await axiosInstance.put(
        `/productapi/product/update/${selectedProduct._id}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
console.log("editproduct",editproduct);

      fetchProducts(currentPage);
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

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Use products directly as they are already paginated by backend
  const currentItems = filteredProducts;

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
                  Total: {totalItems}
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
                        // "Discount",
                        "Category",
                        "Brand",
                        // "Status",
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
                      currentItems.map((product, index) => {
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
                            {/* <td className="px-4 py-4">
                              {product.discountPrice ? (
                                <span className="font-semibold text-emerald-600">
                                  ₹{product.discountPrice}
                                </span>
                              ) : (
                                <span className="text-gray-400 text-sm">-</span>
                              )}
                            </td> */}

                            {/* Category */}
                            <td className="px-4 py-4 text-sm text-gray-800">
                              {getCategoryName(product)}
                            </td>

                            {/* Brand */}
                            <td className="px-4 py-4 text-sm text-gray-800">
                              {getBrandName(product)}
                            </td>

                            {/* Status */}
                            {/* <td className="px-4 py-4">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                  product.status,
                                )}`}
                              >
                                {product.status || "Active"}
                              </span>
                            </td> */}

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

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/50">
                  <span className="text-sm text-gray-500">
                    Showing {totalItems === 0 ? 0 : indexOfFirstItem + 1} to{" "}
                    {indexOfFirstItem + filteredProducts.length} of {totalItems}{" "}
                    entries
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className="px-3 py-1.5 text-sm font-medium border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>
                    <div className="flex items-center gap-1 hidden sm:flex">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-8 h-8 flex items-center justify-center text-sm font-medium rounded-lg transition-colors ${
                              currentPage === page
                                ? "bg-violet-600 text-white shadow-sm"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            {page}
                          </button>
                        ),
                      )}
                    </div>
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="px-3 py-1.5 text-sm font-medium border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Product Form Modal */}
      <ProductForm
        isOpen={isProductFormOpen}
        onClose={() => setIsProductFormOpen(false)}
        refreshData={() => fetchProducts(currentPage)}
      />

      {isViewOpen && (
        <ProductViewModal
          product={selectedProduct}
          onClose={() => setIsViewOpen(false)}
          getCategoryName={getCategoryName}
          getBrandName={getBrandName}
          getStatusColor={getStatusColor}
          getProductImageUrl={getProductImageUrl}
          formatDate={formatDate}
        />
      )}

      {isEditOpen && (
        <ProductEditModal
          product={selectedProduct}
          formData={editFormData}
          editImage={editImage}
          editLoading={editLoading}
          onClose={() => setIsEditOpen(false)}
          onChange={handleEditChange}
          onImageChange={handleEditImageChange}
          onSubmit={handleEditSubmit}
          getProductImageUrl={getProductImageUrl}
        />
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
