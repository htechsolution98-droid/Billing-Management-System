import User from "../../models/User.js";
import Product from "../../models/Product.js";
import DistrictDist from "../../models/DistrictDist.js";

export const getStateDashboardService = async (stateDistId) => {
  const districtDistributors = await DistrictDist.find({
    createdBy: stateDistId,
    role: "DISTRICT_DISTRIBUTOR",
  });

  const districtIds = districtDistributors.map((dist) => dist._id);

  const totalDistrictDistributor = districtDistributors.length;

  const totalShopUsers = await User.countDocuments({
    createdBy: { $in: districtIds },
    role: "ShopUser",
  });

  const shopUsers = await User.find({
    createdBy: { $in: districtIds },
    role: "ShopUser",
  });

  const shopUserIds = shopUsers.map((shop) => shop._id);

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
