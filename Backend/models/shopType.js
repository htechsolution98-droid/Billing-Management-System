import mongoose from "mongoose";
const shopTypeSchema = new mongoose.Schema(
  {
    shopTypeName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isApproved: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const ShopType = mongoose.model("ShopType", shopTypeSchema);

export default ShopType;
