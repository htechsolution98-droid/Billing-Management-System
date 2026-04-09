import Distributor from "../../models/Distributor/Distributor.js";
import Register from "../../models/AuthModel/Registermodel/register.js";

export const CreateDistributorservice = async (body) => {

  // Remove confirmPassword
  delete body.confirmPassword;

  // Create Distributor
  // Password will be hashed by model pre("save")
  const distributor =
    await Distributor.create(body);

  // 🔥 VERY IMPORTANT
  // Use SAME hashed password
  await Register.create({
    name: distributor.name,
    email: distributor.email,
    password: distributor.password, // ✅ SAME HASH
    role: "distributor",
    distributorId: distributor._id,
    superAdminId: distributor.superAdminId
  });

  return distributor;
};