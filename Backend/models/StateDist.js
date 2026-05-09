import mongoose from "mongoose";

const stateDistributorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    firmName: {
      type: String,
      required: true,
    },

    ownerName: String,

    mobile: String,
    email: String,

    gstNumber: String,
    panNumber: String,
    aadharNumber: String,

    state: String,
    area: String,

    address: String,

    distributorCode: {
      type: String,
      unique: true,
    },

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
