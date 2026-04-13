import { DistributorDashboardService } from "../../service/Distributor/distdash.service.js";

export const DistributorDashController = async (req,res) => {
  try {
    const data = await DistributorDashboardService();
    res.status(200).json({ msg: "Distributor Dashboard",data });
  } catch (error) {
    res.status(200).json({ error: error.massage });
    console.error(error);
  }
};
