
import User from "../../models/User.js";
import Product from "../../models/Product.js";
import Customer from "../../models/Customer.js";

export const getSuperAdminDashboardService = async () => {
  // USER COUNTS
  const totalStateDistributor = await User.countDocuments({
    role: "STATE_DIST",
  });

  const totalDistrictDistributor = await User.countDocuments({
    role: "DIST_DIST",
  });

  const totalShopUsers = await User.countDocuments({
    role: "SHOP_USER",
  });

  // CUSTOMER COUNT
  const totalCustomers = await Customer.countDocuments();

  // PRODUCT COUNT
  const totalProducts = await Product.countDocuments();

  // ACTIVE USERS
  const activeUsers = await User.countDocuments({
    isActive: true,
  });

  // INACTIVE USERS
  const inactiveUsers = await User.countDocuments({
    isActive: false,
  });

  // LATEST SHOP USERS
  const latestShopUsers = await User.find({
    role: "SHOP_USER",
  })
    .sort({ createdAt: -1 })
    .limit(5)
    .select("-password");

  // LATEST CUSTOMERS
  const latestCustomers = await Customer.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .select("-password");

  // LATEST PRODUCTS
  const latestProducts = await Product.find()
    .sort({ createdAt: -1 })
    .limit(5);

  return {
    totalStateDistributor,
    totalDistrictDistributor,
    totalShopUsers,
    totalCustomers,
    totalProducts,
    activeUsers,
    inactiveUsers,
    latestShopUsers,
    latestCustomers,
    latestProducts,
  };
};