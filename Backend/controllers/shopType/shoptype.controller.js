import { Createshoptypeservice } from "../../services/shopType/shoptype.service.js";
import { Getshoptypeservice } from "../../services/shopType/shoptype.service.js";
import { Updateshoptypeservice } from "../../services/shopType/shoptype.service.js";
import { Deleteshoptypeservice } from "../../services/shopType/shoptype.service.js";

export const CreateshoptypeController = async (req, res) => {
  try {
    const master = await Createshoptypeservice({
      ...req.body,

      createdBy: req.user._id,

      // SUPER_ADMIN → true
      // ShopUser → false
      isApproved: req.user.role === "SUPER_ADMIN",
    });

    res.status(201).json({
      success: true,
      msg: "ShopType Created Successfully",
      data: master,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      msg: "ShopType Can't Be Created",
    });
  }
};

export const GetshoptypeController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;

    const limit = parseInt(req.query.limit) || 10;

    const search = req.query.search || "";
    const role = req.user.role;
    const data = await Getshoptypeservice(page, limit, search, role);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const updateshoptypecontroller = async (req, res, next) => {
  try {
    if (req.user.role !== "SUPER_ADMIN") {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const { id } = req.params;

    const body = { ...req.body };

    const updatemaster = await Updateshoptypeservice(id, body);

    res.status(200).json({
      message: "ShopType Updated Successfully",
      data: updatemaster,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const Deleteshoptypecontroller = async (req, res, next) => {
  try {
    if (req.user.role !== "SUPER_ADMIN") {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const { id } = req.params;

    const deletemaster = await Deleteshoptypeservice(id);

    res.status(200).json({
      success: true,
      message: "ShopType Deleted Successfully",
      data: deletemaster,
    });
  } catch (error) {
    next(error);
  }
};
