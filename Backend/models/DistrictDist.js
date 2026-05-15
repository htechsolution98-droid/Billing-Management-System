import mongoose from "mongoose";

const districtDistributorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    stateDistributorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StateDistributor",
      // required: true,
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

    district: {
      type: String,
      required: true,
    },

    area: String,

    address: String,

    isActive: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    //multer use file upload
    corpo_certificatno: {
      type: String, // file path stored here
    },

    // commissionPercent: {
    //   type: Number,
    //   default: 0,
    // },
    // distributorCode: {
    //   type: String,
    //   unique: true,
    // },
  },
  { timestamps: true },
);

// Auto user Code
// districtDistributorSchema.pre("save", async function () {
//   if (!this.distributorCode) {
//     const count = await mongoose.model("DistrictDistributor").countDocuments();

//     this.distributorCode = "DISTTRICT" + String(count + 1).padStart(4, "0");
//   }
// });

export default mongoose.model("DistrictDistributor", districtDistributorSchema);
