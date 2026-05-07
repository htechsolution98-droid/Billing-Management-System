import Brand from "../../../models/User/Brand.js";

export const Brandeditservice = async (barndId, body) => {
  try {
    const updatedbrand = await Brand.findByIdAndUpdate(barndId, body, {
      new: true,
      runValidators: true,
    });

     if (!updatedbrand) {
        throw new Error("Brand Not Found");  
     }
     return updatedbrand

  } catch (error) {
    console.error(error);
    throw error
  }
};
