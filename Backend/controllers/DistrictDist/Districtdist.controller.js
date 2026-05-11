import {CreateDistrictDistService} from "../../services/DistrictDistibutor/DistrictDist.service.js"
import User from "../../models/User.js";

export const CreateDistrictDistController = async (req,res) => {
    try {
    // 1. extract body here
    const { name, email,mobile, password } = req.body;

    // 2. create user
    const user = await User.create({
      name,
      email,
      mobile,
      password,
      role: "DISTRICT_DISTRIBUTOR",
      createdBy: req.user._id,
    });
    // 3. create distributor
    const dist = await CreateDistrictDistService({
      ...req.body,
      userId: user._id,
      createdBy: req.user._id,
    });
    res.status(201).json({
      success: true,
      msg: "DISTRICT_DISTRIBUTOR Create Sucsesfully ",
      data: dist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "DISTRICT_DISTRIBUTOR Can't Be Create Sucsesfully ",
    });
    console.error(error);
  }
}

// export const CreateSateDistService = async (req,res) => {
//     try {
        
//     } catch (error) {
//         console.error(error);
        
//     }
// }

// export const CreateSateDistService = async (req,res) => {
//     try {
        
//     } catch (error) {
//         console.error(error);
        
//     }
// }

// export const CreateSateDistService = async (req,res) => {
//     try {
        
//     } catch (error) {
//         console.error(error);
        
//     }
// }