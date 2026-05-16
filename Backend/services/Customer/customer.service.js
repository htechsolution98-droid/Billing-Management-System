import Customer from "../../models/Customer.js";
import Product from "../../models/product.js";
import Shopuser from "../../models/Shop.js";

export const createCustomerservice = async (body) => {
  return await Customer.create(body);
};

export const getProductsByShopCodeService = async (shopCode) => {
  const normalizedShopCode = shopCode?.trim().toUpperCase();

  const shopUser = await Shopuser.findOne({
    shopCode: normalizedShopCode,
  });

  if (!shopUser) {
    return null;
  }

  const products = await Product.find({
    shopUserId: shopUser._id,
    status: "active",
  })
    .populate("categoryId", "categoryName")
    .populate("subCategoryId", "subCategoryName")
    .populate("brandId", "brandName")
    .sort({ createdAt: -1 });

  return {
    shopUser,
    products,
  };
};
