// services/dashboard/shop.dashboard.service.js

import Product from "../../models/Product.js";

export const getShopDashboardService = async (shopUserId) => {
  const totalProducts = await Product.countDocuments({
    createdBy: shopUserId,
  });

  const latestProducts = await Product.find({
    createdBy: shopUserId,
  })
    .sort({ createdAt: -1 })
    .limit(5);

  return {
    totalProducts,
    latestProducts,
  };
};
