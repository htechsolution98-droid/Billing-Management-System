import { loginService } from "../../../service/Authservice/Login/login.service.js";

import Distributor from "../../../models/Distributor/Distributor.js";

export const logincontroller = async (req, res) => {
  try {
    const data = await loginService(req.body);
    res.status(200).json({
      message: "Login successful",
      token: data.token,
      user: data.user,
    });
  } catch (error) {
    const statusCode =
      error.message === "User not found" || error.message === "Invalid password"
        ? 401
        : error.message === "Your account is deactivated. Contact SuperAdmin."
          ? 403
          : 500;

    res.status(statusCode).json({
      error: error.message,
    });
  }
};
