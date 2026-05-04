import Brand from "../../../models/User/Brand.js";
export const GetBrandByCategoryService = async (categoryId, userId) => {
  return await Brand.find({
    categoryId: categoryId,
    userId: userId,
    status: "active",
  });
};
