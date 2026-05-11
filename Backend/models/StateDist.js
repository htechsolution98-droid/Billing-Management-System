import mongoose from "mongoose";

const stateDistributorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    firmName: {
      type: String,
      required: true,
      trim: true,
    },

    gstNumber: String,

    panNumber: String,

    aadharNumber: String,

    state: {
      type: String,
      required: true,
    },

    area: String,

    address: String,

    distributorCode: {
      type: String,
      unique: true,
    },

    // commissionPercent: {
    //   type: Number,
    //   default: 0,
    // },

    isActive: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

export default mongoose.model("StateDistributor", stateDistributorSchema);
