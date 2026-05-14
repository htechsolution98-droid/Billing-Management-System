// services/dashboard/state.dashboard.service.js

import User from "../../models/User.js";
import Product from "../../models/Product.js";

export const getStateDashboardService = async (stateDistId) => {

  const districtDistributors = await User.find({
    createdBy: stateDistId,
    role: "DIST_DIST",
  });

  const districtIds = districtDistributors.map(
    (dist) => dist._id
  );

  const totalDistrictDistributor = districtDistributors.length;

  const totalShopUsers = await User.countDocuments({
    createdBy: { $in: districtIds },
    role: "SHOP_USER",
  });

  const shopUsers = await User.find({
    createdBy: { $in: districtIds },
    role: "SHOP_USER",
  });

  const shopUserIds = shopUsers.map(
    (shop) => shop._id
  );

  const totalProducts = await Product.countDocuments({
    createdBy: { $in: shopUserIds },
  });

  return {
    totalDistrictDistributor,
    totalShopUsers,
    totalProducts,
    latestDistrictDistributor: districtDistributors.slice(0, 5),
    latestShopUsers: shopUsers.slice(0, 5),
  };
};