// import { Error } from "mongoose";
// import {CreateDistributorservice} from "../../service/Distributor/CreateDistributor.service.js";
// import { createDistributorController } from "../Authcontroller/Registercontroller/ditributor.controller.js";
import { CreateUserservice } from "../../service/User/CreateUser.service.js";
export const createUsercontroller = async (req, res) => {
  try {
    const body = req.body;
    // console.log("Uploaded File", req.file);
    // console.log(body);

    //Firmlogoo upload
    if (req.file) {
      body.firmLogo = req.file.filename;
    }

    body.distributorId = req.user._id;
    const data = await CreateUserservice(req.body);
    res.status(200).json({ msg: "Produt Added", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
