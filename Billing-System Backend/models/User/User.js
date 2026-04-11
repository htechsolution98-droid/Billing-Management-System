import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    firmName: {
      type: String,
      required: true,
      trim: true,
    },

    gst: {
      type: String,
      // required: false, // optional
    },

    pan: {
      type: String,
      // required: false, // optional
    },

    firmLogo: {
      type: String, // store uploaded file path
    },

    aadhaar: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    role: {
      type: String,
      default: "user",
    },
    distributorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Distributor", // <<-- THIS MUST BE HERE
      // <<-- THIS MUST BE HERE
    },

    bankName: {
      type: String,
      required: true,
    },

    ifsc: {
      type: String,
      required: true,
    },

    accountNumber: {
      type: String,
      required: true,
    },

    accountHolderName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
