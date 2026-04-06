import mongoose from "mongoose";
import bcrypt from "bcrypt";

const distributorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    mobile: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    confirmPassword: {
      type: String,
    },

    gst: String,
    pan: String,
    aadhaar: String,

    state: {
      type: String,
      required: true,
    },

    district: {
      type: String,
      required: true,
    },

    area: {
      type: String,
      required: true,
    },

    firmName: String,

    distributorCode: {
      type: String,
      unique: true,
    },

    role: {
      type: String,
      enum: ["distributor"],
      default: "distributor",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);
// Auto Distributor Code
distributorSchema.pre("save", async function () {

  if (!this.distributorCode) {

    const count =
      await mongoose
        .model("Distributor")
        .countDocuments();

    this.distributorCode =
      "DIST-" +
      String(count + 1).padStart(4, "0");

  }

});


// Password Hash
distributorSchema.pre("save", async function () {

  // Only hash if password modified
  if (!this.isModified("password")) return;

  this.password =
    await bcrypt.hash(
      this.password,
      10
    );

});
export default mongoose.model("Distributor", distributorSchema);
