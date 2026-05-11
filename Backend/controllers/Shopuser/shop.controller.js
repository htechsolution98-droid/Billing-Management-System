import { Shopcreateservice } from "../../services/Shopuser/shop.service.js";
import User from "../../models/User.js";

export const ShopuserController = async (req, res) => {
  try {
    // 1. extract body here
    const { name, email, mobile, password } = req.body;

    // 2. create user
    const user = await User.create({
      name,
      email,
      mobile,
      password,
      role: "User",
      createdBy: req.user._id,
    });
    // 3. create distributor
    const dist = await Shopcreateservice({
      ...req.body,
      userId: user._id,
      createdBy: req.user._id,
    });
    res.status(201).json({
      success: true,
      msg: "User Create Sucsesfully ",
      data: dist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "User Can't Be Create Sucsesfully ",
    });
    console.error(error);
  }
};

// export const ShopuserController= async (req,res) => {
//     try {

//     } catch (error) {
//         console.error(error);

//     }
// }

// export const ShopuserController= async (req,res) => {
//     try {

//     } catch (error) {
//         console.error(error);

//     }
// }

// export const ShopuserController= async (req,res) => {
//     try {

//     } catch (error) {
//         console.error(error);

//     }
// }
