import StateDistibutor from "../../models/StateDist.js";
import DistrictDist from "../../models/DistrictDist.js";
import Shop from "../../models/Shop.js";
import Product from "../../models/product.js";
import Customer from "../../models/Customer.js";

export const getSuperAdminDashboardService = async () => {
  // USER COUNTS
  const totalStateDistributor = await StateDistibutor.countDocuments({
    role: "STATE_DISTRIBUTOR",
  });

  const totalDistrictDistributor = await DistrictDist.countDocuments({
    role: "DISTRICT_DISTRIBUTOR",
  });

  const totalShopUsers = await Shop.countDocuments({
    role: "ShopUser",
  });

  // CUSTOMER COUNT
  const totalCustomers = await Customer.countDocuments();

  // PRODUCT COUNT
  const totalProducts = await Product.countDocuments();

  // ACTIVE USERS
  const activeUsers = await StateDistibutor.countDocuments({
    isActive: true,
  });

  // INACTIVE USERS
  const inactiveUsers = await StateDistibutor.countDocuments({
    isActive: false,
  });

  return {
    totalStateDistributor,
    totalDistrictDistributor,
    totalShopUsers,
    totalCustomers,
    totalProducts,
    activeUsers,
    inactiveUsers,
  };
};
