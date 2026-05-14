// services/dashboard/district.dashboard.service.js

import User from "../../models/User.js";
import Product from "../../models/Product.js";

export const getDistrictDashboardService = async (districtId) => {

  const shopUsers = await User.find({
    createdBy: districtId,
    role: "SHOP_USER",
  });

  const shopUserIds = shopUsers.map(
    (shop) => shop._id
  );

  const totalShopUsers = shopUsers.length;

  const totalProducts = await Product.countDocuments({
    createdBy: { $in: shopUserIds },
  });

  const latestProducts = await Product.find({
    createdBy: { $in: shopUserIds },
  })
    .sort({ createdAt: -1 })
    .limit(5);

  return {
    totalShopUsers,
    totalProducts,
    latestShopUsers: shopUsers.slice(0, 5),
    latestProducts,
  };
};