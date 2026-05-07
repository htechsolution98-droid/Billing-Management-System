import User from "../../models/User/User.js";
import Distributor from "../../models/Distributor/Distributor.js";

export const GetUserservice = async () => {
  return await User.find()
    .populate({
      path: "distributorId",
      select: "name distributorCode",
    })
    .populate({
      path: "superAdminId",
      select: "name",
    });
};
