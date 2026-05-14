import { getDistrictDashboardService } from "../../services/DistrictDistibutor/districtdash.service";


export const getDistrictDashboardController = async (
  req,
  res
) => {
  try {

    const dashboard =
      await getDistrictDashboardService(req.user._id);

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