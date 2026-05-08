import mongoose from "mongoose";

const masterShopSchema = new mongoose.Schema(
  {
    shopName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const MasterShop = mongoose.model("MasterShop", masterShopSchema);

export default MasterShop;