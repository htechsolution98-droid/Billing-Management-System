import mongoose from "mongoose";

const MasterSchema = new mongoose.Schema(
  {
    MasterShopName: {
      type: String,
      required: true,
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
  },
);

const Master = mongoose.model("Master", MasterSchema);

export default Master;
