import mongoose from "mongoose";
const shopTypeSchema = new mongoose.Schema(
  {
    shopTypeName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

const ShopType = mongoose.model("ShopType", shopTypeSchema);

export default ShopType;
