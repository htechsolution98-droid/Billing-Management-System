import mongoose from "mongoose";

const productCatalogSchema = new mongoose.Schema(
  {
    shopTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShopType",
      required: true,
    },

    productName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

  
  },
  { timestamps: true },
);

// UNIQUE PRODUCT NAME INSIDE SHOP TYPE
productCatalogSchema.index({ shopTypeId: 1, productName: 1 }, { unique: true });

const ProductCatalog = mongoose.model("ProductCatalog", productCatalogSchema);

export default ProductCatalog;
