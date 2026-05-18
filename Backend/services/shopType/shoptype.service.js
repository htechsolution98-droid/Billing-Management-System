import mongoose from "mongoose";
import shopType from "../../models/shopType.js";

export const Createshoptypeservice = async (data) => {
  return await shopType.create(data);
};

export const Getshoptypeservice = async (page = 1, limit = 10, search = "") => {
  try {
    const skip = (page - 1) * limit;
    const cleanSearch = (search || "").toString().trim();

    const query = {
      ...(cleanSearch && {
        shopTypeName: {
          $regex: cleanSearch,
          $options: "i",
        },
      }),
    };
    const total = await shopType.countDocuments(query);
    const Master = await shopType
      .find(query)
      .skip(skip)
      .limit(limit)
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: Master,
    };
  } catch (error) {
    throw error;
  }
};

export const Updateshoptypeservice = async (MasterId, body) => {
  try {
    const updateMaster = await shopType.findByIdAndUpdate(
      MasterId,
      updateData,
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!updateMaster) {
      throw new Error("ShopType not found");
    }

    return updateMaster;
  } catch (error) {
    throw error;
  }
};

export const Deleteshoptypeservice = async (MasterId) => {
  try {
    const Masterdelete = await shopType.findById(MasterId);

    if (!Masterdelete) {
      throw new Error("ShopType not found");
    }

    await shopType.findByIdAndDelete(MasterId);

    return Masterdelete;
  } catch (error) {
    throw error;
  }
};
