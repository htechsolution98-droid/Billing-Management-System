import Product from "../../../models/User/product.js";
import Category from "../../../models/User/Category.js";
import Brand from "../../../models/User/Brand.js";

export const GetProductservice = async (page = 1, limit = 5, search = "") => {
  const skip = (page - 1) * limit;
   const cleanSearch = search.trim();

  // ✅ Only product name search
  const query = cleanSearch
    ? { productName: { $regex: cleanSearch, $options: "i" } }
    : {};

  const total = await Product.countDocuments(query);
  const users = await Product.find(query)
    .populate("categoryId", "categoryName")
    .populate("brandId", "brandName")
    .populate("userId", "fullName")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    data: users,
  };
};
