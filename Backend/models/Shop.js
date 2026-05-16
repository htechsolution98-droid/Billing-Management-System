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

    firmName: {
      type: String,
      required: true,
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
    shopCode: {
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
// Auto user Code
shopSchema.pre("save", async function () {
  if (!this.shopCode) {
    const count = await mongoose.model("Shopuser").countDocuments();

    this.shopCode = "SHOPUSER" + String(count + 1).padStart(4, "0");
  }
}); 
export default mongoose.model("Shopuser", shopSchema);
