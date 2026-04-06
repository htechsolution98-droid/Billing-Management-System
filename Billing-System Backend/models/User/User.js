import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  phone: {
    type: String
  },

  address: {
    type: String
  },

  distributorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Distributor",
    required: true
  },

  role: {
    type: String,
    enum: ["user"],
    default: "user"
  },

  isActive: {
    type: Boolean,
    default: true
  }

},
{ timestamps: true }
);

export default mongoose.model("User", userSchema);