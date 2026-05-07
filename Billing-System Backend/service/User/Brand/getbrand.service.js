import Brand from "../../../models/User/Brand.js";

export const GetBrandService = async (userId) => {
  return await Brand.find({ userId: userId })
    .populate("userId", "fullName")
    .populate("categoryId", "categoryName");
};
