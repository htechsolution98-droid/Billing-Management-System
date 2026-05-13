import { GetProductSevice } from "../../services/Product/product.service.js";
import User from "../../models/User.js";

export const createproductcontroller = async (req, res) => {
  try {
    // 1. extract body here
    const { name, email, password, mobile } = req.body;

    // 2. create user
    const user = await User.create({
      name,
      email,
      password,
      mobile,
      role: "ShopUser",
      createdBy: req.user._id,
    });

    const data = await GetProductSevice({
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


export const getproductcontroller = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
}


export const updateproductcontroller = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
}


export const deleteproductcontroller = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
}