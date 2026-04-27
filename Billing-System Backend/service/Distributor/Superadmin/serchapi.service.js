// import User from "../../models/User/User.js";
import Distributor from "../../../models/Distributor/Distributor.js";

export const SearchUserservice = async (keyword) => {
  try {
    const users = await Distributor.find({
      name: { $regex: keyword, $options: "i" },
    })
    //   .select("-password")
    //   .populate({
    //     path: "distributorId",
    //     select: "name distributorCode",
    //   });

    return users;
  } catch (error) {
    throw error;
  }
};
