import User from "../../../models/User/User.js";
import Customer from "../../../models/User/Customer.js";

export const getNUserCustomersController = async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }

    console.log("Logged User:", req.user._id);

    const nuser = await User.findOne({
      $or: [{ registerId: req.user._id }, { _id: req.user._id }],
    });

    console.log("NUser Found:", nuser);

    if (!nuser) {
      return res.status(404).json({
        message: "NUser profile not found",
      });
    }

    const customers = await Customer.find({
      nuserId: nuser._id,
    });

    return res.status(200).json({
      data: customers,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const getcustocontroller = async (req, res) => {
  try {
    if (req.user?.role === "superadmin") {
      const data = await Customer.find().populate("nuserId", "fullName email");

      return res.status(200).json({
        data,
      });
    }

    if (req.user?.role === "nuser") {
      return getNUserCustomersController(req, res);
    }

    return res.status(403).json({
      message: "Access Denied",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
