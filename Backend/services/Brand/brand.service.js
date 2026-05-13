import Brand from "../../models/brand";

export const CreateBrandService = async (body) => {
  return await Brand.create(body);
};

export const Getbrandservice = async (
  shopUserId,
  page = 1,
  limit = 5,
  search = "",
) => {
  try {
    const skip = (page - 1) * limit;
    const cleanSearch = (search || "").toString().trim();

    const query = {
      shopUserId,
      ...(cleanSearch && {
        brandName: { $regex: cleanSearch, $options: "i" },
      }),
    };
    const total = await Brand.countDocuments(query);
    const brands = await Brand.find(query)
      .populate("createdBy", "name email")
      .populate("shopUserId", "firmName")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: brands,
    };
  } catch (error) {
    throw error;
  }
};
export const Brandeditservice = async (brandId, body) => {
  try {
    const updatedbrand = await Brand.findByIdAndUpdate(brandId, body, {
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

export const Deletebrandservice = async (brandId) => {
  try {
    const deletedata = await Brand.findByIdAndDelete(brandId);

    if (!deletedata) {
      throw new Error("Brand Not Found");
    }
    return deletedata;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
