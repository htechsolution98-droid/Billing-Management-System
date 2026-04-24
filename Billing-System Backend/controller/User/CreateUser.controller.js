// import { Error } from "mongoose";
// import {CreateDistributorservice} from "../../service/Distributor/CreateDistributor.service.js";
// import { createDistributorController } from "../Authcontroller/Registercontroller/ditributor.controller.js";
import { CreateUserservice } from "../../service/User/CreateUser.service.js";
import {CreateDistributorservice} from  "../../service/Distributor/CreateDistributor.service.js";
import Distributor from "../../models/Distributor/Distributor.js";


export const createUsercontroller = async (req, res, next) => {
  try {

    // ✅ Check login
    if (!req.user?._id) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }

    const body = { ...req.body };

    // ✅ If file uploaded
    if (req.file) {
      body.firmLogo = req.file.filename;
    }

    // ==============================
    // DISTRIBUTOR CREATES USER
    // ==============================

    if (req.user.role === "distributor") {

      body.distributorId = req.user._id;

    }

    // ==============================
    // SUPERADMIN CREATES USER
    // ==============================

    if (req.user.role === "superadmin") {

      // if (!req.body.distributorId) {
      //   return res.status(400).json({
      //     message: "DistributorId is required",
      //   });
      // }

      body.distributorId = req.body.distributorId;

    }

    // console.log("DistributorId:",
    //   body.distributorId);

    const data =
      await CreateUserservice(body);

    res.status(201).json({
      message: "User created successfully",
      data,
    });

  } catch (error) {

    console.error(error);

    next(error);
  }
};
