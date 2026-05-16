import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
  {
    subCategoryName: {
      type: String,
      required: true,
      trim: true,
    },

    // Parent category
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    // Shop owner
    shopUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shopuser",
      required: true,
    },

    // Creator
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
  },
  {
    timestamps: true,
  },
);

// unique subcategory per category per shop
subCategorySchema.index(
  {
    subCategoryName: 1,
    categoryId: 1,
    shopUserId: 1,
  },
  { unique: true },
);

const SubCategory = mongoose.model("SubCategory", subCategorySchema);

export default SubCategory;
