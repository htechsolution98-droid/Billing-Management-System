import Register from "../../../models/AuthModel/Registermodel/register.js";
import Distributor from "../../../models/Distributor/Distributor.js";
import User from "../../../models/User/User.js";
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
  const appUser = registerUser || distributorUser ? null : await User.findOne({ email });

  if (!registerUser && !distributorUser && !appUser) {
    throw new Error("User not found");
  }

  let user = null;

  if (registerUser && (await verifyAndUpgradePassword(password, registerUser))) {
    user = registerUser;
  }

  if (!user && distributorUser && (await verifyAndUpgradePassword(password, distributorUser))) {
    user = distributorUser;
  }

  if (!user && appUser && (await verifyAndUpgradePassword(password, appUser))) {
    user = appUser;
  }

  if (!user) {
    throw new Error("Invalid password");
  }

  const normalizedRole = user.role === "user" ? "nuser" : user.role;
  const name = user.name || user.fullName;
  const distributorId =
    user.distributorId || (normalizedRole === "distributor" ? user._id : null);

  const token = jwt.sign(
    {
      _id: user._id,
      role: normalizedRole,
      superAdminId: user.superAdminId,
      distributorId,
    },
    process.env.JWT_SECRET,
    { expiresIn: "5d" },
  );

  return {
    token,
    user: {
      _id: user._id,
      name,
      email: user.email,
      role: normalizedRole,
      superAdminId: user.superAdminId,
      distributorId,
    },
  };
};
