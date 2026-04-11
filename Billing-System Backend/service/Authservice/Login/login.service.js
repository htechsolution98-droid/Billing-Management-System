import Register from "../../../models/AuthModel/Registermodel/register.js";
import Distributor from "../../../models/Distributor/Distributor.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const verifyAndUpgradePassword = async (plainPassword, user) => {
  let isMatch = false;
  const isHashedPassword =
    typeof user.password === "string" &&
    /^\$2[aby]\$\d{2}\$/.test(user.password);

  if (isHashedPassword) {
    isMatch = await bcrypt.compare(plainPassword, user.password);
  } else {
    isMatch = plainPassword === user.password;

    if (isMatch) {
      user.password = await bcrypt.hash(plainPassword, 10);
      await user.save();
    }
  }

  return isMatch;
};

export const loginService = async (data) => {
  const email = data.email?.trim().toLowerCase();
  const password = String(data.password ?? "").trim();

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const registerUser = await Register.findOne({ email });
  const distributorUser = registerUser ? null : await Distributor.findOne({ email });

  if (!registerUser && !distributorUser) {
    throw new Error("User not found");
  }

  let user = null;

  if (registerUser && (await verifyAndUpgradePassword(password, registerUser))) {
    user = registerUser;
  }

  if (!user && distributorUser && (await verifyAndUpgradePassword(password, distributorUser))) {
    user = distributorUser;
  }

  if (!user) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    {
      _id: user._id,
      role: user.role,
      superAdminId: user.superAdminId,
      distributorId: user.distributorId || (user.role === "distributor" ? user._id : null),
    },
    process.env.JWT_SECRET,
    { expiresIn: "5d" },
  );

  return {
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      superAdminId: user.superAdminId,
      distributorId: user.distributorId || (user.role === "distributor" ? user._id : null),
    },
  };
};
