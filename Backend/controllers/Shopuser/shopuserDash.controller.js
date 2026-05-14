import { getShopDashboardService } from "../../services/Shopuser/shopuserdash.service.js";
// import { getShopDashboardService } from "../../services/dashboard/shop.dashboard.service.js";

export const getShopDashboardController = async (req, res) => {
  try {
    const dashboard = await getShopDashboardService(req.user._id);

    return res.status(200).json({
      success: true,
      dashboard,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
