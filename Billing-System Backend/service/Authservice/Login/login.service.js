import Register from "../../../models/AuthModel/Registermodel/register.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export const loginService = async (data) => {

  const user = await Register.findOne({
    email: data.email
  });

  if (!user) {
    throw new Error("User not found");
  }

  // 🔐 bcrypt password compare
  const isMatch =
    await bcrypt.compare(
      data.password,
      user.password
    );
    console.log(isMatch);
    

  if (!isMatch) {
    throw new Error("Invalid password");
  }

  // JWT TOKEN
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "5d"
    }
  );

  return {
    token,
    role: user.role
  };
};