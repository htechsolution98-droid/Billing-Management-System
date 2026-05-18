import { CreateProductService } from "../../services/Product/product.service.js";
import { GetProductService } from "../../services/Product/product.service.js";
import { UpdatedProductService } from "../../services/Product/product.service.js";
import { DeleteProductService } from "../../services/Product/product.service.js";
import Shopuser from "../../models/Shop.js";
import slugify from "slugify";
import Product from "../../models/product.js";
import ProductCatalog from "../../models/productcatalog.js";

// ================= CREATE PRODUCT =================
export const createproductcontroller = async (req, res) => {
  try {
    // =========================
    // FIND LOGGED-IN SHOP
    // =========================

    const shop = await Shopuser.findOne({
      userId: req.user._id,
    });

    if (!shop) {
      return res.status(404).json({
        success: false,
        message: "Shop not found",
      });
    }

    // =========================
    // MULTIPLE IMAGE UPLOAD
    // =========================

    const images = req.files ? req.files.map((file) => file.path) : [];

    // =========================
    // VARIANTS
    // =========================

    let variants = [];

    if (req.body.variants) {
      variants =
        typeof req.body.variants === "string"
          ? JSON.parse(req.body.variants)
          : req.body.variants;
    }

    // =========================
    // BODY
    // =========================

    const body = {
      ...req.body,

      productImage: images,

      variants,

      shopUserId: shop._id,

      createdBy: req.user._id,
    };

    // =========================
    // CREATE PRODUCT
    // =========================

    const data = await CreateProductService(body);

    return res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      data,
    });
  } catch (error) {
    console.log(error);

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

    // FIND SHOP
    const shop = await Shopuser.findOne({
      userId: req.user._id,
    });

    if (!shop) {
      return res.status(404).json({
        success: false,
        message: "Shop not found",
      });
    }

    // VERIFY OWNERSHIP
    const product = await Product.findOne({
      _id: id,
      shopUserId: shop._id,
    }).populate("productCatalogId");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found or unauthorized",
      });
    }

    // NEW UPLOADED IMAGES
    const images = req.files
      ? req.files.map((file) => file.path)
      : product.productImage;

    // VARIANTS PARSE
    let variants = product.variants || [];

    if (req.body.variants) {
      variants =
        typeof req.body.variants === "string"
          ? JSON.parse(req.body.variants)
          : req.body.variants;
    }

    // =========================
    // PRODUCT CATALOG LOGIC
    // =========================

    let productCatalogId = product.productCatalogId;

    // ONLY IF PRODUCT NAME CHANGED
    if (
      req.body.productName &&
      req.body.productName.toLowerCase() !==
        product.productCatalogId?.productName?.toLowerCase()
    ) {
      let productCatalog = await ProductCatalog.findOne({
        productName: req.body.productName.toLowerCase(),
        shopTypeId: req.body.shopTypeId || product.shopTypeId,
      });

      // CREATE IF NOT EXIST
      if (!productCatalog) {
        productCatalog = await ProductCatalog.create({
          productName: req.body.productName.toLowerCase(),

          shopTypeId: req.body.shopTypeId || product.shopTypeId,

          slug: slugify(req.body.productName, {
            lower: true,
            strict: true,
          }),
        });
      }

      productCatalogId = productCatalog._id;
    }

    // FINAL BODY
    const body = {
      ...req.body,

      productCatalogId,

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
