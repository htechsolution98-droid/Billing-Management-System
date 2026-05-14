import Customer from "../../models/Customer.js";
import Product from "../../models/Product.js";
import User from "../../models/User.js";

export const createCustomerservice = async (body) => {
  return await Customer.create(body);
};

export const getProductsByShopCodeService = async (shopCode) => {
  const shopUser = await User.findOne({
    shopCode,
    role: "SHOP_USER",
  });

  if (!shopUser) {
    return null;
  }

  const products = await Product.find({
    createdBy: shopUser._id,
  });

  return {
    shopUser,
    products,
  };
};
