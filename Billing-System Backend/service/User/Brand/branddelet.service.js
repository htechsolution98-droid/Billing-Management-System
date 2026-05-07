import Brand from "../../../models/User/Brand.js";

export const Deletebrandservice = async (BrandId) => {
  try {
    const deletedata = await Brand.findByIdAndDelete(BrandId);

    if (!deletedata) {
      throw new Error("Brand Not Found");
    }
    return deletedata;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
