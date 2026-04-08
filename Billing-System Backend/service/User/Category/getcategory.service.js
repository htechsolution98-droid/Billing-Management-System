import Category from "../../../models/User/Category.js";

export const GetCategoryService = async () => {

  return await Category.find();

};