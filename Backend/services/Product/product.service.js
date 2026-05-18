import Product from "../../models/product.js";
import ProductCatalog from "../../models/productcatalog.js";
import slugify from "slugify";

export const CreateProductService = async (data) => {
  try {
    const { productName, shopTypeId } = data;

    // =========================
    // CHECK PRODUCT CATALOG
    // =========================

    let productCatalog = await ProductCatalog.findOne({
      productName: productName?.toLowerCase(),
      shopTypeId,
    });

    // =========================
    // CREATE CATALOG IF NOT EXIST
    // =========================

    if (!productCatalog) {
      productCatalog = await ProductCatalog.create({
        productName: productName.toLowerCase(),

        shopTypeId,

        slug: slugify(productName, {
          lower: true,
          strict: true,
        }),
      });
    }

    // =========================
    // CREATE PRODUCT
    // =========================

    const product = await Product.create({
      ...data,

      productCatalogId: productCatalog._id,
    });

    return product;
  } catch (error) {
    throw error;
  }
};

export const GetProductService = async (
  shopUserId,
  page = 1,
  limit = 5,
  search = "",
) => {
  try {
    const skip = (page - 1) * limit;
    const cleanSearch = (search || "").toString().trim();

    const query = {
      shopUserId,
      ...(cleanSearch && {
        productName: { $regex: cleanSearch, $options: "i" },
      }),
    };
    const total = await Product.countDocuments(query);
    const product = await Product.find(query)
      .populate("productCatalogId", "productName")
      .populate("shopUserId", "firmName")
      .populate("createdBy", "name")
      .populate("categoryId", "categoryName")
      .populate("subCategoryId", "subCategoryName")
      .populate("brandId", "brandName")
      .populate("shopTypeId", "shopTypeName")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: product,
    };
  } catch (error) {
    throw error;
  }
};

export const UpdatedProductService = async (productId, body) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("product  not found");
    }
    // update Category table
    const updateproduct = await Product.findByIdAndUpdate(productId, body, {
      new: true,
      runValidators: true,
    });
    return updateproduct;
  } catch (error) {
    throw error;
  }
};
export const DeleteProductService = async (productId) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("product not found");
    }
    // delete Category
    await Product.findByIdAndDelete(productId);
    return product;
  } catch (error) {
    throw error;
  }
};
