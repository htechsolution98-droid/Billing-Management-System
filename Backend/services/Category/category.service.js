import Category from "../../models/category.js";
import User from "../../models/User.js";

export const Createcategservice = async (data) => {
  return await Category.create(data);
};

export const Getcategoryservice = async (
  shopUserId,
  page = 1,
  limit = 5,
  search = "",
) => {
  try {
    const skip = (page - 1) * limit;
    const cleanSearch = (search || "").toString().trim();

    const query = {
      shopUserId,
      ...(cleanSearch && {
        categoryName: { $regex: cleanSearch, $options: "i" },
      }),
    };
    const total = await Category.countDocuments(query);
    const categories  = await Category.find(query)
      .populate("createdBy", "name email")
      .populate("shopUserId", "firmName")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: categories ,
    };
  } catch (error) {
    throw error;
  }
};

export const Updatecategoryservice = async (categoryId, body) => {
  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      throw new Error("Category  not found");
    }
    // update Category table
    const updatecategory = await Category.findByIdAndUpdate(categoryId, body, {
      new: true,
      runValidators: true,
    });
    return updatecategory;
  } catch (error) {
    throw error;
  }
};

export const Deletecategoryservice = async (categoryId) => {
  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      throw new Error("Category not found");
    }
    // delete Category
    await Category.findByIdAndDelete(categoryId);
    return category;
  } catch (error) {
    throw error;
  }
};

