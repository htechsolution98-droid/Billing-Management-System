import mongoose from "mongoose";
import bcrypt from "bcrypt";   

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
      trim: true,
      lowercase: true,
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


RegisterSchema.index(
  { role: 1 },
  {
    unique: true,
    partialFilterExpression: {
      role: "superadmin"
    }
  }
);

//
// 🔐 PASSWORD HASHING ( ADD )
//
RegisterSchema.pre("save", async function () {

  // Only hash if password NOT already hashed
  if (!this.isModified("password")) return;

  // Prevent double hash
  if (this.password.startsWith("$2b$")) return;

  this.password =
    await bcrypt.hash(this.password, 10);

});
export default mongoose.model("Register", RegisterSchema);
