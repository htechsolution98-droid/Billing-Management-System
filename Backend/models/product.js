  import mongoose from "mongoose";

  const productSchema = new mongoose.Schema(
    {
      // productName: {
      //   type: String,
      //   required: true,
      //   trim: true,
      // },
      productCatalogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductCatalog",
        required: true,
      },
      productImage: {
        type: [String], // store image path
      },
      productDescription: {
        type: String,
        required: true,
      },
      productUnit: {
        type: String,
        enum: ["kg", "gm", "liter", "ml", "piece", "cm"],
        required: false,
      },
      shopTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ShopType",
        required: true,
      },
      shopUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shopuser",
        required: true,
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
      },
      categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
      brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
      },

      // New variants array to support "Sizes & Pricing"
      variants: [
        {
          sizeName: { type: String, required: true },
          price: {
            type: Number,
            required: true,
            min: [0, "Price cannot be negative"],
          },
          discountPrice: { type: Number, min: [0, "Price cannot be negative"] },
          stock: {
            type: Number,
            default: 0,
            min: [0, "Price cannot be negative"],
          },
        },
      ],
      status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
      },
    },
    {
      timestamps: true,
    },
  );

  productSchema.index(
    {
      productName: 1,
      shopUserId: 1,
    },
    { unique: true },
  );
  const Product = mongoose.model("Product", productSchema);

  export default Product;
