import Brand from "../../models/brand.js";
import Shopuser from "../../models/Shop.js";
import { CreateBrandService } from "../../services/Brand/brand.service.js";
import { Getbrandservice } from "../../services/Brand/brand.service.js";
import { Brandeditservice } from "../../services/Brand/brand.service.js";
import { Deletebrandservice } from "../../services/Brand/brand.service.js";

// export const CreateBrandController = async (req, res) => {
//   try {
//     const body = { ...req.body, userId: req.user._id };
//     // console.log(body, "barndcont");

//     const data = await CreateBrandService(body);

//     res.status(200).json({
//       msg: "Brand Created",
//       data,
//     });
//   } catch (error) {
//     res.status(500).json({
//       error: error.message,
//     });
//   }
// };
export const CreateBrandController = async (req, res) => {
  try {
    // Find shop
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

      // shop owner
      shopUserId: shop._id,

      // who created
      createdBy: req.user._id,
    };

    const data = await CreateBrandService(body);

    res.status(201).json({
      success: true,
      message: "Brand Created Successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const GetBrandController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

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
    const data = await Getbrandservice(shop._id, page, limit, search);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const editBrandController = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedBrand = await Brandeditservice(id, req.body);

    return res.status(200).json({
      success: true,
      message: "Brand updated successfully",
      data: updatedBrand,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
export const deleteBrandController = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBrand = await Deletebrandservice(id);

    return res.status(200).json({
      success: true,
      message: "Brand deleted successfully",
      data: deletedBrand,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
