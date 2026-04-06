import mongoose  from "mongoose";
// import mongoose from "mongoose";

const distributorSchema =  new mongoose.Schema(
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
    type: String,
    required:true
  },

  companyName: {
    type: String
  },

  address: {
    type: String
  },

  role: {
    type: String,
    enum: ["distributor"],
    default: "distributor"
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Register"   // SuperAdmin reference
  },

  isActive: {
    type: Boolean,
    default: true
  }

},
{ timestamps: true }
);

export default mongoose.model("Distributor", distributorSchema);
 
