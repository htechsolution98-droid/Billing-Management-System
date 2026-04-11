import mongoose from "mongoose";
import bcrypt from "bcrypt";

const distributorSchema = new mongoose.Schema(
  {
    superAdminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Register",
    
    },
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

    gst: {
      type: String,
    },
    pan: {
      type: String,
    },
    aadhaar: {
      type: String,
    },

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
    companypan: {
      type: String,
    },

    corpo_certino: {
      type: String, // file path stored here
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
    const count = await mongoose.model("Distributor").countDocuments();

    this.distributorCode = "DIST-" + String(count + 1).padStart(4, "0");
  }
});

// Password Hash
distributorSchema.pre("save", async function () {
  // Only hash if password modified
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});
export default mongoose.model("Distributor", distributorSchema);
