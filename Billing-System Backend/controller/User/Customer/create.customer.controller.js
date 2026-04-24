import { createCustomerservice } from "../../../service/User/Customer/create.customer.service.js";
import User from "../../../models/User/User.js";

export const createcustocontroller = async (req, res) => {
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

    const body = { ...req.body };

    delete body.nuserId;

    body.nuserId = nuser._id;

    const data = await createCustomerservice(body);

    res.status(201).json({ msg: "Customer created", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
};
