// import { Error } from "mongoose";
// import {CreateDistributorservice} from "../../service/Distributor/CreateDistributor.service.js";
// import { createDistributorController } from "../Authcontroller/Registercontroller/ditributor.controller.js";
import { CreateUserservice } from "../../service/User/CreateUser.service.js";
export const createUsercontroller = async (req, res, next) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }

    const body = { ...req.body };

    if (req.file) {
      body.firmLogo = req.file.filename;
    }

    body.distributorId = req.user._id;

    const data = await CreateUserservice(body);

    res.status(201).json({
      message: "User created successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

