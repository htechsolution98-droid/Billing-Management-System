import { CreateProductService } from "../../services/Product/product.service.js";
import { GetProductService } from "../../services/Product/product.service.js";
import { UpdatedProductService } from "../../services/Product/product.service.js";
import { DeleteProductService } from "../../services/Product/product.service.js";
import Shopuser from "../../models/Shop.js";

// ================= CREATE PRODUCT =================
export const createproductcontroller = async (req, res) => {
  try {
    // find logged-in shop
    const shop = await Shopuser.findOne({
      userId: req.user._id,
    });

    if (!shop) {
      return res.status(404).json({
        success: false,
        message: "Shop not found",
      });
    }

    // multiple image upload
    const images = req.files ? req.files.map((file) => file.path) : [];

    let variants = [];

    if (req.body.variants) {
      variants = req.body.variants;
    }

    const body = {
      ...req.body,

      productImage: images,

      variants,

      shopUserId: shop._id,

      createdBy: req.user._id,
    };

    const data = await CreateProductService(body);

    return res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET PRODUCT =================
export const getproductcontroller = async (req, res) => {
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

    const data = await GetProductService(shop._id, page, limit, search);

    return res.status(200).json({
      success: true,
      message: "Product Get Successfully",
      ...data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= UPDATE PRODUCT =================
export const updateproductcontroller = async (req, res) => {
  try {
    const { id } = req.params;

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

    // verify ownership
    const product = await Product.findOne({
      _id: id,
      shopUserId: shop._id,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found or unauthorized",
      });
    }

    // new uploaded images
    const images = req.files
      ? req.files.map((file) => file.path)
      : product.productImage;

    // variants parse
    let variants = product.variants || [];

    if (req.body.variants) {
      variants = JSON.parse(req.body.variants);
    }

    const body = {
      ...req.body,

      productImage: images,

      variants,
    };

    const updatedproduct = await UpdatedProductService(id, body);

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedproduct,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

// ================= DELETE PRODUCT =================
export const deleteproductcontroller = async (req, res) => {
  try {
    const { id } = req.params;

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

    // verify ownership
    const product = await Product.findOne({
      _id: id,
      shopUserId: shop._id,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found or unauthorized",
      });
    }

    const deletedproduct = await DeleteProductService(id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: deletedproduct,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
