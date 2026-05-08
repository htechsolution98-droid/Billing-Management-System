import mongoose from "mongoose";

const masterProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },

    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MasterShop",
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

// Prevent duplicate products inside same shop
masterProductSchema.index({ productName: 1, shopId: 1 }, { unique: true });

const MasterProduct = mongoose.model("MasterProduct", masterProductSchema);

export default MasterProduct;
