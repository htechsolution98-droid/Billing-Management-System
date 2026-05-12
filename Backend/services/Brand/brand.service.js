import Brand from "../../models/brand";

export const CreateBrandService = async (body) => {
  return await Brand.create(body);
};

export const GetBrandService = async (userId) => {
  return await Brand.find({ userId: userId })
    .populate("userId", "fullName")
    .populate("categoryId", "categoryName");
};

export const Brandeditservice = async (barndId, body) => {
  try {
    const updatedbrand = await Brand.findByIdAndUpdate(barndId, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedbrand) {
      throw new Error("Brand Not Found");
    }
    return updatedbrand;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

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
