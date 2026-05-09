import { CreateDist } from "../../services/StateDistibutor/StateDist.service.js";
import User from "../../models/User.js";

export const CreateDistController = async (req, res) => {
  try {
    // 1. extract body here
    const { name, email, password } = req.body;

    // 2. create user
    const user = await User.create({
      name,
      email,
      password,
      role: "STATE_DISTRIBUTOR",
      createdBy: req.user._id,
    });
    // 3. create distributor
    const dist = await CreateDist({
      ...req.body,
      userId: user._id,
      createdBy: req.user._id,
    });
    res.status(200).json({
      success: true,
      msg: "State Distibutor Create Sucsesfully ",
      data: dist,
    });
  } catch (error) {
    res.status(500).json({
      sucsess: false,
      msg: "State Distibutor Can't Be Create Sucsesfully ",
    });
    console.error(error);
  }
};

// export const CreateDistController = async (req, res) => {
//   try {
//     const dist = await CreateDist(req.body);
//     res.status(200).json({
//       sucsess: false,
//       msg: "State Distibutor Create Sucsesfully ",
//     });
//   } catch (error) {
//     res.status(500).json({
//       sucsess: false,
//       msg: "State Distibutor Can't Be Create Sucsesfully ",
//     });
//     console.error(error);
//   }
// };

// export const CreateDistController = async (req, res) => {
//   try {
//     const dist = await CreateDist(req.body);
//     res.status(200).json({
//       sucsess: false,
//       msg: "State Distibutor Create Sucsesfully ",
//     });
//   } catch (error) {
//     res.status(500).json({
//       sucsess: false,
//       msg: "State Distibutor Can't Be Create Sucsesfully ",
//     });
//     console.error(error);
//   }
// };

// export const CreateDistController = async (req, res) => {
//   try {
//     const dist = await CreateDist(req.body);
//     res.status(200).json({
//       sucsess: false,
//       msg: "State Distibutor Create Sucsesfully ",
//     });
//   } catch (error) {
//     res.status(500).json({
//       sucsess: false,
//       msg: "State Distibutor Can't Be Create Sucsesfully ",
//     });
//     console.error(error);
//   }
// };
