import { CreateMasterservice } from "../../services/MasterType/mastertype.service.js";
import { Getmasterservice } from "../../services/MasterType/mastertype.service.js";
import { Updatemasterservice } from "../../services/MasterType/mastertype.service.js";
import { Deletemasterservice } from "../../services/MasterType/mastertype.service.js";
export const CreatemasterController = async (req, res) => {
  try {
    const master = await CreateMasterservice({
      ...req.body,
      //   userId: user._id,
      //   createdBy: req.user._id,
    });
    res.status(200).json({
      success: true,
      msg: "Master Create Sucsesfully ",
      data: master,
    });
  } catch (error) {
    res.status(500).json({
      sucsess: false,
      msg: "master Can't Be Create Sucsesfully ",
    });
    console.error(error);
  }
};

export const GetmasterController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    const data = await Getmasterservice(page, limit, search);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatemastercontroller = async (req, res, next) => {
  try {
    if (req.user.role !== "SUPER_ADMIN") {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const { id } = req.params;

    const body = { ...req.body };

    const updatemaster = await Updatemasterservice(id, body);

    res.status(200).json({
      message: "master updated successfully",
      data: updatemaster,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const Deletemastercontroller = async (req, res, next) => {
  try {
    if (req.user.role !== "SUPER_ADMIN") {
      return res.status(403).json({
        message: "Access denied",
      });
    }
    const { id } = req.params;

    // console.log("Delete ID:", id);

    const deletemaster = await Deletemasterservice(id);

    res.status(200).json({
      success: true,
      message: "master deleted successfully",
      data: deletemaster,
    });
  } catch (error) {
    next(error);
  }
};
