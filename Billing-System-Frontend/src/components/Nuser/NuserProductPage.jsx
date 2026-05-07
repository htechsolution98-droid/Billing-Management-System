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
import { 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions, 
  Typography, 
  Button, 
  Box, 
  Chip,
  IconButton,
  Collapse,
  Tooltip
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axiosInstance from "../../api/axiosInstance";
import Sidebar from "./Sidebar";
// import Header from "./Header";
import LogoutModal from "./LogoutModal";
import ProductForm from "./ProductForm";
// import ProductViewModal from "./ProductViewModal";
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
  const [editImages, setEditImages] = useState([]);
  const [retainedImages, setRetainedImages] = useState([]);
  const [editError, setEditError] = useState(null);

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
  const [expandedProducts, setExpandedProducts] = useState([]);

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
      // console.log("Fetched Products Data:", productData[0]);
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
      subcategory: product.subcategory || "",
      variants: product.variants || [
        { sizeName: "", price: "", discountPrice: "", stock: "" },
      ],
    });
    setEditImages([]);
    setRetainedImages(
      product.productImage
        ? Array.isArray(product.productImage)
          ? product.productImage
          : [product.productImage]
        : [],
    );
    setEditError(null);
    setIsEditOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "categoryId" ? { brandId: "", subcategory: "" } : {}),
    }));
  };

  const handleEditImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setEditImages((prev) => [...prev, ...files]);
    e.target.value = "";
  };

  const removeEditImage = (index, isRetained) => {
    if (isRetained) {
      setRetainedImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      setEditImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // Submit edit product*******************************************
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditError(null);

    if (editFormData.variants) {
      for (let i = 0; i < editFormData.variants.length; i++) {
        const price = parseFloat(editFormData.variants[i].price);
        const discountPrice = parseFloat(
          editFormData.variants[i].discountPrice,
        );
        if (discountPrice && discountPrice > price) {
          setEditError(
            `Discount price cannot be greater than regular price in Size ${i + 1}`,
          );
          return;
        }
      }
    }

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
          if (key === "variants") {
            data.append(key, JSON.stringify(value));
          } else {
            data.append(key, value);
          }
        }
      });
      if (editImages.length > 0) {
        editImages.forEach((img) => data.append("productImage", img));
      }
      if (retainedImages.length > 0) {
        data.append("retainedImages", JSON.stringify(retainedImages));
      }

      await axiosInstance.put(
        `/productapi/product/update/${selectedProduct._id}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      fetchProducts(currentPage);
      setIsEditOpen(false);
      setEditImages([]);
      setRetainedImages([]);
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
  const getProductImageUrl = (productImg) => {
    // Check if the image field is an array (as defined in the Mongoose schema)
    let productImage = productImg;
    if (Array.isArray(productImage)) {
      productImage = productImage.length > 0 ? productImage[0] : null;
    }

    if (!productImage || typeof productImage !== "string") {
      if (productImage)
        console.warn(
          "Invalid productImage type or value:",
          typeof productImage,
          productImage,
        );
      return "";
    }

    let finalUrl = "";
    if (productImage.startsWith("http")) {
      finalUrl = productImage;
    } else if (productImage.includes("/uploads/")) {
      // If it contains /uploads/ but doesn't start with http, it might be a relative path from root
      const pathPart = productImage.substring(
        productImage.indexOf("/uploads/"),
      );
      finalUrl = `${API_ORIGIN}${pathPart}`;
    } else if (productImage.includes("uploads/")) {
      const pathPart = productImage.substring(productImage.indexOf("uploads/"));
      finalUrl = `${API_ORIGIN}/${pathPart}`;
    } else if (productImage.startsWith("ProductImg/")) {
      finalUrl = `${API_ORIGIN}/uploads/${productImage}`;
    } else {
      // Assume it's just the filename
      finalUrl = `${API_ORIGIN}/uploads/ProductImg/${productImage}`;
    }

    return finalUrl;
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
  // const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
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

              <div className="p-6">
                {loading ? (
                  <div className="py-12 flex justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="py-12 flex flex-col items-center gap-2 text-gray-500">
                    <Package className="w-12 h-12 text-gray-300" />
                    <p>No products found</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {currentItems.map((product, index) => {
                      const isExpanded = expandedProducts.includes(product._id);
                      const imageUrl = getProductImageUrl(product.productImage);

                      return (
                        <Card 
                          key={product._id} 
                          sx={{ 
                            height: '100%', 
                            display: 'flex', 
                            flexDirection: 'column',
                            borderRadius: '12px',
                            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                            }
                          }}
                        >
                          <Box sx={{ 
                            position: 'relative', 
                            width: '100%', 
                            pt: '100%', // 1:1 Aspect Ratio
                            bgcolor: 'grey.50',
                            overflow: 'hidden'
                          }}>
                            <CardMedia
                              component="img"
                              image={imageUrl || "/placeholder-product.png"}
                              alt={product.productName}
                              sx={{ 
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain', 
                                p: 2
                              }}
                            />
                            <Box sx={{ position: 'absolute', top: 6, left: 6, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                              <Chip 
                                label={getCategoryName(product)} 
                                size="small" 
                                sx={{ 
                                  bgcolor: 'rgba(255,255,255,0.95)', 
                                  backdropFilter: 'blur(4px)',
                                  fontWeight: 'bold', 
                                  fontSize: '9px',
                                  height: '18px'
                                }} 
                              />
                            </Box>
                            <Box sx={{ position: 'absolute', top: 6, right: 6 }}>
                              <Chip 
                                label={getBrandName(product)} 
                                size="small" 
                                color="primary"
                                sx={{ 
                                  fontWeight: 'bold', 
                                  fontSize: '9px',
                                  height: '18px'
                                }} 
                              />
                            </Box>
                          </Box>

                          <CardContent sx={{ flexGrow: 1, p: 1.5, pb: '8px !important' }}>
                            <Typography gutterBottom variant="subtitle1" component="h2" noWrap sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 0.5 }}>
                              {product.productName}
                            </Typography>
                            
                            <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                              {product.variants && product.variants.length > 0 ? (
                                product.variants.slice(0, 3).map((v, i) => (
                                  <Box key={i} sx={{ 
                                    p: 0.75, 
                                    borderRadius: '6px', 
                                    bgcolor: 'white', 
                                    border: '1px solid', 
                                    borderColor: 'grey.200',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    minWidth: '70px',
                                    flex: '1 1 calc(50% - 8px)'
                                  }}>
                                    <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', fontSize: '9px', lineHeight: 1 }}>
                                      {v.sizeName}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5, mt: 0.25 }}>
                                      <Typography variant="body2" sx={{ fontWeight: 800, fontSize: '0.85rem' }}>
                                        ₹{v.discountPrice || v.price || "0"}
                                      </Typography>
                                      {v.discountPrice && Number(v.discountPrice) > 0 && (
                                        <Typography variant="caption" sx={{ textDecoration: 'line-through', color: 'text.disabled', fontSize: '8px' }}>
                                          ₹{v.price}
                                        </Typography>
                                      )}
                                    </Box>
                                  </Box>
                                ))
                              ) : (
                                <Box sx={{ 
                                  p: 1, 
                                  borderRadius: '6px', 
                                  bgcolor: 'white', 
                                  border: '1px solid', 
                                  borderColor: 'grey.200',
                                  width: '100%'
                                }}>
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
                                      <Typography variant="body2" sx={{ fontWeight: 800 }}>
                                        ₹{product.discountPrice || product.productPrice || "0"}
                                      </Typography>
                                      {product.discountPrice && Number(product.discountPrice) > 0 && (
                                        <Typography variant="caption" sx={{ textDecoration: 'line-through', color: 'text.disabled', fontSize: '10px' }}>
                                          ₹{product.productPrice}
                                        </Typography>
                                      )}
                                    </Box>
                                    <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '10px' }}>
                                      Stock: {product.stock || 0}
                                    </Typography>
                                  </Box>
                                </Box>
                              )}
                              {product.variants && product.variants.length > 3 && (
                                <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 600, mt: 0.5 }}>
                                  +{product.variants.length - 3} more sizes
                                </Typography>
                              )}
                            </Box>
                          </CardContent>

                          <CardActions sx={{ justifyContent: 'space-between', px: 1.5, pb: 1.5, pt: 0 }}>
                            <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
                              <Button 
                                variant="outlined" 
                                size="small"
                                onClick={() => handleEdit(product)}
                                startIcon={<EditIcon sx={{ fontSize: 16 }} />}
                                sx={{ 
                                  flex: 1,
                                  borderRadius: '8px', 
                                  textTransform: 'none', 
                                  fontWeight: 700, 
                                  fontSize: '0.8rem',
                                  py: 0.75,
                                  bgcolor: 'white',
                                  color: 'grey.800',
                                  borderColor: 'grey.300',
                                  '&:hover': { 
                                    bgcolor: 'grey.50',
                                    borderColor: 'grey.400'
                                  }
                                }}
                              >
                                Edit
                              </Button>
                              <Button 
                                variant="contained" 
                                color="error" 
                                size="small"
                                onClick={() => handleDelete(product._id)}
                                startIcon={<DeleteIcon sx={{ fontSize: 16 }} />}
                                sx={{ 
                                  flex: 1,
                                  borderRadius: '8px', 
                                  textTransform: 'none', 
                                  fontWeight: 700, 
                                  fontSize: '0.8rem',
                                  py: 0.75,
                                  bgcolor: 'red.600',
                                  '&:hover': { bgcolor: 'red.700' }
                                }}
                              >
                                Delete
                              </Button>
                            </Box>
                            
                            <IconButton
                              size="small"
                              onClick={() => {
                                setExpandedProducts((prev) =>
                                  prev.includes(product._id)
                                    ? prev.filter((id) => id !== product._id)
                                    : [...prev, product._id],
                                );
                              }}
                              sx={{ 
                                ml: 1,
                                width: 32,
                                height: 32,
                                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s'
                              }}
                            >
                              <ExpandMoreIcon />
                            </IconButton>
                          </CardActions>

                          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                            <CardContent sx={{ 
                              pt: 0, 
                              bgcolor: 'grey.50',
                              borderTop: '1px solid',
                              borderColor: 'grey.100'
                            }}>
                              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5, mt: 1, color: 'grey.700', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                                Description
                              </Typography>
                              <Box sx={{ 
                                maxHeight: '100px', 
                                overflowY: 'auto',
                                pr: 1,
                                '&::-webkit-scrollbar': {
                                  width: '4px',
                                },
                                '&::-webkit-scrollbar-track': {
                                  background: '#f1f1f1',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                  background: '#ddd',
                                  borderRadius: '10px',
                                },
                                '&::-webkit-scrollbar-thumb:hover': {
                                  background: '#ccc',
                                }
                              }}>
                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem', lineHeight: 1.5 }}>
                                  {product.productDescription || "No description available."}
                                </Typography>
                              </Box>
                            </CardContent>
                          </Collapse>
                        </Card>
                      );
                    })}
                  </div>
                )}
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

      {/* ProductViewModal is currently disabled (import commented out)
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
      )} */}

      {isEditOpen && (
        <ProductEditModal
          product={selectedProduct}
          formData={editFormData}
          editImages={editImages}
          retainedImages={retainedImages}
          editLoading={editLoading}
          error={editError}
          onClose={() => setIsEditOpen(false)}
          onChange={handleEditChange}
          onImageChange={handleEditImageChange}
          removeEditImage={removeEditImage}
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
