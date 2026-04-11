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
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
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
