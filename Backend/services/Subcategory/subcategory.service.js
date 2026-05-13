import SubCategory from "../../models/subcategory.js";

export const createsubcategory = async (data) => {
  return await SubCategory.create(data);
};

export const Getsubcategoryservice = async (
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
        subCategoryName: { $regex: cleanSearch, $options: "i" },
      }),
    };
    const total = await SubCategory.countDocuments(query);
    const subCategory = await SubCategory.find(query)
      .populate("createdBy", "name email")
      .populate("shopUserId", "firmName")
      .populate("categoryId", "categoryName")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: subCategory,
    };
  } catch (error) {
    throw error;
  }
};

export const Updatesubcategoryservice = async (subcategoryId, body) => {
  try {
    const subcategory = await SubCategory.findById(subcategoryId);
    if (!subcategory) {
      throw new Error("Category  not found");
    }
    // update Category table
    const updatesubcategory = await SubCategory.findByIdAndUpdate(
      subcategoryId,
      body,
      {
        new: true,
        runValidators: true,
      },
    );
    return updatesubcategory;
  } catch (error) {
    throw error;
  }
};

export const Deletesubcategoryservice = async (subcategoryId) => {
  try {
    const subcategory = await SubCategory.findById(categoryId);
    if (!subcategory) {
      throw new Error("Category not found");
    }
    // delete Category
    await SubCategory.findByIdAndDelete(subcategory);
    return subcategory;
  } catch (error) {
    throw error;
  }
};
