import { Createcategservice } from "../../services/Category/category.service.js";
import { Getcategoryservice } from "../../services/Category/category.service.js";
import { Updatecategoryservice } from "../../services/Category/category.service.js";
import { Deletecategoryservice } from "../../services/Category/category.service.js";
import Shopuser from "../../models/Shop.js";

export const CreateCategorycontroller = async (req, res) => {
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

    const data = await Createcategservice(body);

    res.status(201).json({
      success: true,
      message: "Category Created Successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const GetCategorycontroller = async (req, res) => {
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
        message: "ShopUser in category not found",
      });
    }

    // pass shop id
    const data = await Getcategoryservice(shop._id, page, limit, search);

    res.status(200).json({
      success: true,
      message: "Category Get Successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const editCategoryController = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedcate = await Updatecategoryservice(id, req.body);

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: updatedcate,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedcate = await Deletecategoryservice(id);

    return res.status(200).json({
      success: true,
      message: "category deleted successfully",
      data: deletedcate,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
