import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },

    productImage: {
      type: [String], // store image path
    },

    productDescription: {
      type: String,
      required: true,
    },

    // Single unit/price fields kept for backward compatibility but made optional
    // productUnit: {
    //   type: String,
    //   enum: ["kg", "gm", "liter", "ml", "piece"],
    //   required: false,
    // },

    // productPrice: {
    //   type: Number,
    //   required: false,
    // },

    // discountPrice: {
    //   type: Number,
    //   required: false,
    // },

    // New variants array to support "Sizes & Pricing"
    variants: [
      {
        sizeName: { type: String, required: true },
        price: { type: Number, required: true, min: [0, "Price cannot be negative"], },
        discountPrice: { type: Number , min: [0, "Price cannot be negative"],},
        stock: { type: Number, default: 0, min: [0, "Price cannot be negative"], },
      },
    ],

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      
    },

    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
     
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
