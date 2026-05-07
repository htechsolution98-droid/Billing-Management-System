import Category from "../../../models/User/Category.js";

export const GetCategoryService = async (userId) => {
  
  return await Category.find({userId: userId, 
    }).populate("userId", "fullName");

};