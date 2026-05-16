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

    isActive: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // commissionPercent: {
    //   type: Number,
    //   default: 0,
    // },
    // stateCode: {
    //   type: String,
    //   unique: true,
    // },
  },
  { timestamps: true },
);
// Auto user Code
// stateDistributorSchema.pre("save", async function () {
//   if (!this.stateCode) {
//     const count = await mongoose.model("StateDistributor").countDocuments();

//     this.stateCode = "STATE" + String(count + 1).padStart(4, "0");
//   }
// });
export default mongoose.model("StateDistributor", stateDistributorSchema);
