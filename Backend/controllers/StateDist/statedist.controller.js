import { CreateDist } from "../../services/StateDistibutor/StateDist.service.js";
import User from "../../models/User.js";
import { Getstatedistservice } from "../../services/StateDistibutor/StateDist.service.js";
import { Updatestatedistservice } from "../../services/StateDistibutor/StateDist.service.js";
import { Deletestatedistservice } from "../../services/StateDistibutor/StateDist.service.js";
import DistrictDistributor from "../../models/DistrictDist.js";
import Shopuser from "../../models/Shop.js";
export const CreateDistController = async (req, res) => {
  try {
    // 1. extract body here
    const { name, email, password, mobile } = req.body;

    // 2. create user
    const user = await User.create({
      name,
      email,
      password,
      mobile,
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

export const GetstatedistController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    const data = await Getstatedistservice(req.user._id, page, limit, search);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatestatedistcontroller = async (req, res, next) => {
  try {
    if (req.user.role !== "SUPER_ADMIN") {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const { id } = req.params;

    const body = { ...req.body };

    const updateddist = await Updatestatedistservice(id, body);

    res.status(200).json({
      message: "StateDist updated successfully",
      data: updateddist,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const Deletestatedistcontroller = async (req, res, next) => {
  try {
    if (req.user.role !== "SUPER_ADMIN") {
      return res.status(403).json({
        message: "Access denied",
      });
    }
    const { id } = req.params;

    // console.log("Delete ID:", id);

    const deletedist = await Deletestatedistservice(id);

    res.status(200).json({
      success: true,
      message: "StateDistibutor deleted successfully",
      data: deletedist,
    });
  } catch (error) {
    next(error);
  }
};

//============================================================
export const getDistrictByStateController = async (req, res) => {
  try {
    const { stateDistributorId } = req.params;

    const districts = await DistrictDistributor.find({
      stateDistributorId,
    })
      .populate("userId")
      .populate("stateDistributorId");

    res.status(200).json({
      success: true,
      count: districts.length,
      data: districts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getShopsByDistrictController = async (req, res) => {
  try {
    const { districtDistributorId } = req.params;

    const shops = await Shopuser.find({
      districtDistributorId,
    })
      .populate("userId")
      .populate("districtDistributorId");

    res.status(200).json({
      success: true,
      count: shops.length,
      data: shops,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
