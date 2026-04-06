import mongoose from "mongoose";
import bcrypt from "bcrypt";   // ✅ ADD THIS

const RegisterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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

    role: {
      type: String,
      enum: ["superadmin", "distributor", "nuser"],
      default: "nuser",
    },

    superAdminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Register",
      default: null,
    },

    distributorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Register",
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

//
// 🔐 PASSWORD HASHING ( ADD )
//

RegisterSchema.pre("save", async function () {

  // Only hash if password modified
  if (!this.isModified("password")) {
    return;
  }

  // Hash password
  this.password = await bcrypt.hash(
    this.password,
    10
  );

});

export default mongoose.model("Register", RegisterSchema);