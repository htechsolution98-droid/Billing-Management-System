import Shop from "../../models/Shop.js";
import Customer from "../../models/Customer.js";

export const getDistrictDashboardService = async (districtId) => {
  const shopUsers = await Shop.find({
    createdBy: districtId,
    role: "ShopUser",
  });

  const shopUserIds = shopUsers.map((shop) => shop._id);

  const totalShopUsers = shopUsers.length;

  const totalcustomer = await Customer.countDocuments({
    // createdBy: { $in: shopUserIds },
  });

  return {
    totalShopUsers,
    latestShopUsers: shopUsers.slice(0, 5),
    totalcustomer,
  };
};
