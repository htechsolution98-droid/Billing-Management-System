import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      required: true,
      trim: true,
    },
    // Category owner shop
    shopUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shopuser",
      required: true,
    },

    // Who created category
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
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
brandSchema.index(
  {
    brandName: 1,
    shopUserId: 1,
    categoryId: 1,
  },
  { unique: true },
);
const Brand = mongoose.model("Brand", brandSchema);

export default Brand;
