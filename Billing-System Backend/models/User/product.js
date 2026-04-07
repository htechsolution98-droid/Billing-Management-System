import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },

    productImage: {
      type: String, // store image path
      required: false,
    },

    productDescription: {
      type: String,
      required: true,
    },

    productUnit: {
      type: String,
      enum: ["kg", "gm", "liter", "ml", "piece"],
      required: true,
    },

    productPrice: {
      type: Number,
      required: true,
    },

    discountPrice: {
      type: Number,
      required: false,
    },

    productCategory: {
      type: String,
      required: true,
    },

    productBrand: {
      type: String,
      required: true,
    },

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

const Product = mongoose.model("Product", productSchema);

export default Product;
