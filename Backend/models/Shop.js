import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
  {
    // Login User
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
      unique: true,
    },

    // Parent Distributor
    districtDistributorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DistrictDistributor",
      // required: true,
    },

    // Optional direct state relation
    stateDistributorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StateDistributor",
    },

    // Shop Details
    shopName: {
      type: String,
      required: true,
      trim: true,
    },

    firmName: {
      type: String,
      trim: true,
    },

    firmLogo: String,

    gstNumber: String,

    panNumber: String,

    aadharNumber: String,

    // Owner / Contact Person
    contactPersonName: {
      type: String,
      required: true,
    },

    // Banking Details
    bankName: String,

    accountNumber: String,

    ifscCode: String,

    // Location
    state: String,

    district: String,

    area: String,

    address: String,

    pincode: String,

    // Shop Code
    // shopCode: {
    //   type: String,
    //   unique: true,
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
  { timestamps: true }
);

export default mongoose.model("Shopuser", shopSchema);