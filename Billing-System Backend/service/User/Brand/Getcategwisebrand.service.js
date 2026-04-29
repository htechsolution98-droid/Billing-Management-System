import Brand from "../../../models/User/Brand.js";
export const GetBrandByCategoryService = async (categoryId) => {
  return await Brand.find({
    categoryId: categoryId,
   
  });
};
