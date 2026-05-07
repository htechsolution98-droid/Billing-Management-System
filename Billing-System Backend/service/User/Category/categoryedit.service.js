import Catogory from "../../../models/User/Category.js";

export const Categoryeditservice = async (CategoryId, body) => {
  try {
    const updatedcategory = await Catogory.findByIdAndUpdate(CategoryId, body, {
      new: true,
      runValidators: true,
    });
    if (!updatedcategory) {
      throw new Error("Category Not Found");
    }
    return updatedcategory
  } catch (error) {
    throw error;
    console.error(error);
  }
};
