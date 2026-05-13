import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,
    },

    // Category owner shop
    shopUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shopuser",
      required: true,
    },

    // Who created category
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    isGlobal: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

categorySchema.index({ categoryName: 1, shopUserId: 1 }, { unique: true });

const Category = mongoose.model("Category", categorySchema);

export default Category;
