import { getStateDashboardService } from "../../services/StateDistibutor/statedash.service.js";
export const getStateDashboardController = async (req, res) => {
  try {

    const dashboard = await getStateDashboardService(
      req.user._id
    );

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