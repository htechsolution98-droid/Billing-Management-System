import Register from "../../../models/AuthModel/Registermodel/register.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export const loginService = async (data) => {
  const user = await Register.findOne({
    email: data.email,
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(data.password, user.password);

  if (!isMatch) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    {
      _id: user._id,
      role: user.role,
      superAdminId: user.superAdminId,
      distributorId: user.distributorId,
    },
    process.env.JWT_SECRET,
    { expiresIn: "5d" },
  );

  return {
    token,
    role: user.role,
  };
};
