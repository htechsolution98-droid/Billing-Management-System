import Category from "../../../models/User/Category.js";

export const CreateCategoryService = async (body) => {

  return await Category.create(body);

};