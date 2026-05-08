import MasterShop from "../../../../models/User/MasterShoptype.js";

export const Shopcreate = async (data) => {
  const shopName = data.shopName?.trim();

  if (!shopName) {
    throw new Error("Shop name is required");
  }

  return await MasterShop.create({
    shopName,
    status: data.status || "active",
  });
};

export const ShopGet = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const total = await MasterShop.countDocuments();
  const shop = await MasterShop.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  return {
    limit,
    page,
    total,
    totalpages: Math.ceil(total / limit),
    data: shop,
  };
};

export const ShopEdit = async (shopId, body) => {
  try {
    const updateData = {};

    if (body.shopName !== undefined) {
      updateData.shopName = body.shopName.trim();
    }

    if (body.status !== undefined) {
      updateData.status = body.status;
    }

    const editshop = await MasterShop.findByIdAndUpdate(shopId, updateData, {
      new: true,
      runValidators: true,
    });
    if (!editshop) {
      throw new Error("Shop Not Found");
    }
    return editshop;
  } catch (error) {
    throw error;
  }
};

export const ShopDelete = async (ShopId) => {
  try {
    const deletshop = await MasterShop.findByIdAndDelete(ShopId);
    if (!deletshop) {
      throw new Error("Shop Not Found");
    }
    return deletshop;
  } catch (error) {
    throw error;
  }
};
