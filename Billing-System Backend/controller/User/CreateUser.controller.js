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
      // Resolve distributor document. Token may contain Distributor._id or Register._id
      let dist = null;

      // If token includes distributorId (set at login), try that first
      if (req.user.distributorId) {
        dist = await Distributor.findById(req.user.distributorId);
      }

      // Next, try token _id as Distributor._id
      if (!dist) {
        dist = await Distributor.findById(req.user._id);
      }

      // Fallback: treat token _id as Register._id and lookup by registerId
      if (!dist) {
        dist = await Distributor.findOne({ registerId: req.user._id });
      }

      if (!dist) {
        return res.status(400).json({ message: "Distributor record not found" });
      }

      body.distributorId = dist._id;

    }

    // ==============================
    // SUPERADMIN CREATES USER
    // ==============================

    if (req.user.role === "superadmin") {
      body.superAdminId = req.user._id;

      // Superadmin can optionally assign the NUser under a distributor too.
      if (req.body.distributorId) {
        const providedId = req.body.distributorId;
        let dist = await Distributor.findById(providedId);

        if (!dist) {
          dist = await Distributor.findOne({ registerId: providedId });
        }

        if (!dist) {
          return res.status(400).json({ message: "Distributor not found for given id" });
        }

        body.distributorId = dist._id;
      }
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
