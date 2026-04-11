import register from "../../../models/AuthModel/Registermodel/register.js";

export const getregister = async () => {
  return await register
    .find()
    .populate("superAdminId", "name  role")

    // Populate Distributor name
    .populate("distributorId", "name  role");
};
