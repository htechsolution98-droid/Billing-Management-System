import { SuperAdminDashboardService } from "../../../service/Authservice/Register/sadash.service.js";

export const dashboardController = async (req, res) => {
  try {
    const data = await SuperAdminDashboardService();

    res.status(200).json({
      msg: "SuperAdmin Dashboard Data",
      data,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
