import register from "../../../models/AuthModel/Registermodel/register.js";

export const getregister = async () => {
  return await register
    .find()
    .populate("superAdminId", "name email")
    .populate("distributorId", "name email")
    .select("-password");
  // return await register.find().select("-password");
};
