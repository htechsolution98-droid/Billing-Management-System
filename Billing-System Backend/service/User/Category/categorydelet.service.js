import Category from "../../../models/User/Category.js";

export const Deletecategoryservice = async (CategoryId) => {
  try {
    const deletedata = await Category.findByIdAndDelete(CategoryId);

    if (!deletedata) {
      throw new Error("Category Not Found");
    }
    return deletedata;
  } catch (error) {
    throw error;
    console.error(error);
  }
};
