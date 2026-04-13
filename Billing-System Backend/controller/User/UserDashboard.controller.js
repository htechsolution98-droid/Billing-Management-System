import { NuserDashboardService } from "../../service/User/userdash.service.js";

export const NuserDashController = async (req,res) => {
  try {
    const data = await NuserDashboardService();
    res.status(200).json({ msg: "User Dashboard",data });
  } catch (error) {
    res.status(200).json({ error: error.massage });
    console.error(error);
  }
};

