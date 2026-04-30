import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
      enum: ["user"],
      default: "user",
    },
    registerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Register",
    },
    distributorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Distributor",
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
    usercode: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);
// Auto user Code
userSchema.pre("save", async function () {
  if (!this.usercode) {
    const count = await mongoose.model("User").countDocuments();

    this.usercode = "USER" + String(count + 1).padStart(4, "0");
  }
});

userSchema.pre("save", async function () {
  // Only hash if password modified
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model("User", userSchema);

export default User;
