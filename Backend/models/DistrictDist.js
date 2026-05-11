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

export default mongoose.model("DistrictDistributor", districtDistributorSchema);

// const districtDistributorSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     stateDistributorId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "StateDistributor",
//       required: true,
//     },

//     firmName: {
//       type: String,
//       required: true,
//     },

//     ownerName: String,

//     mobile: String,
//     email: String,

//     gstNumber: String,
//     panNumber: String,
//     aadharNumber: String,

//     state: String,
//     district: String,
//     area: String,

//     address: String,

//     distributorCode: {
//       type: String,
//       unique: true,
//     },

//     isActive: {
//       type: Boolean,
//       default: true,
//     },

//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//   },
//   { timestamps: true },
// );

// export default mongoose.model("DistrictDistributor", districtDistributorSchema);

