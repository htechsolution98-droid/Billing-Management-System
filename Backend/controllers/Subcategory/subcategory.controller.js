import { createsubcategory } from "../../services/Subcategory/subcategory.service.js";
import { Getsubcategoryservice } from "../../services/Subcategory/subcategory.service.js";
import { Updatesubcategoryservice } from "../../services/Subcategory/subcategory.service.js";
import { Deletesubcategoryservice } from "../../services/Subcategory/subcategory.service.js";
import Shopuser from "../../models/Shop.js";

export const Createsubcategorycontroller = async (req, res) => {
  try {
    // find shop
    const shop = await Shopuser.findOne({
      userId: req.user._id,
    });

    if (!shop) {
      return res.status(404).json({
        success: false,
        message: "Shop not found",
      });
    }

    const body = {
      ...req.body,

      shopUserId: shop._id,

      createdBy: req.user._id,
    };

    const data = await createsubcategory(body);

    res.status(201).json({
      success: true,
      message: "Subcategory Created Successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const Getsubcategorycontroller = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    // find shop from logged-in user
    const shop = await Shopuser.findOne({
      userId: req.user._id,
    });

    if (!shop) {
      return res.status(404).json({
        success: false,
        message: "Shop not found",
      });
    }

    // pass shop id
    const data = await Getsubcategoryservice(shop._id, page, limit, search);

    res.status(200).json({
      success: true,
      message: "Subcategory Get Successfully",
      ...data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const Updatesubcategorycontroller = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedcate = await Updatesubcategoryservice(id, req.body);

    return res.status(200).json({
      success: true,
      message: "Subcategory updated successfully",
      data: updatedcate,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const Deletesubcategorycontroller = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedcate = await Deletesubcategoryservice(id);

    return res.status(200).json({
      success: true,
      message: "Subcategory deleted successfully",
      data: deletedcate,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
