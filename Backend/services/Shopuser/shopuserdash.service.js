import Product from "../../models/product.js";
import Customer from "../../models/Customer.js";
import Brand from "../../models/brand.js";
import subcategory from "../../models/subcategory.js";
import category from "../../models/category.js";

export const getShopDashboardService = async (shopUserId) => {
  const totalProducts = await Product.countDocuments({
    createdBy: shopUserId,
  });

  const latestProducts = await Product.find({
    createdBy: shopUserId,
  })
    .sort({ createdAt: -1 })
    .limit(5);

  const totalcategory = await category.countDocuments({
    // createdBy: shopUserId,
  });
  const totalsubcategory = await subcategory.countDocuments({
    // createdBy: shopUserId,
  });
  const totalbrand = await Brand.countDocuments({
    // createdBy: shopUserId,
  });
  const totalcustomer = await Customer.countDocuments({
    // createdBy: shopUserId,
  });
  return {
    totalProducts,
    // latestProducts,
    totalcustomer,
    totalbrand,
    totalsubcategory,
    totalcategory,
  };
};
