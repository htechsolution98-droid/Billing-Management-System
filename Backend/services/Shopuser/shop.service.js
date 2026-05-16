import Shopuser from "../../models/Shop.js";
import User from "../../models/User.js";

export const Shopcreateservice = async (data) => {
  return await Shopuser.create(data);
};

export const GetShopservice = async (role, userId, page, limit, search) => {
  try {
    const skip = (page - 1) * limit;

    let query = {};

    // SUPER ADMIN
    if (role === "SUPER_ADMIN") {
      query = {};
    }

    // DISTRICT DISTRIBUTOR
    else if (role === "DISTRICT_DISTRIBUTOR") {
      query.createdBy = userId;
    }

    // STATE DISTRIBUTOR
    else if (role === "STATE_DISTRIBUTOR") {
      // find districts created by this state user
      const districts = await DistrictDistributor.find({
        createdBy: userId,
      });

      const districtIds = districts.map((d) => d.userId);

      query.createdBy = { $in: districtIds };
    }

    // SEARCH
    if (search) {
      query.$or = [
        { firmName: { $regex: search, $options: "i" } },
        // { area: { $regex: search, $options: "i" } },
      ];
    }

    const shops = await Shopuser.find(query)
      .populate("userId")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Shopuser.countDocuments(query);

    return {
      success: true,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      data: shops,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

//   role,userId,page = 1,limit = 5,search = "",) => {
//   try {
//     const skip = (page - 1) * limit;
//     const cleanSearch = (search || "").toString().trim();
//     let query = {};
//     // SUPER ADMIN
//     if (role === "SUPER_ADMIN") {
//       query = {};
//     }
//     // STATE DISTRIBUTOR
//     else if (role === "STATE_DISTRIBUTOR") {
//       query.stateDistributorId = userId;
//     }
//     // DISTRICT DISTRIBUTOR
//     else if (role === "DISTRICT_DISTRIBUTOR") {
//       query.districtDistributorId = userId;
//     }
//     // SHOP USER
//     else if (role === "SHOP") {
//       query.userId = userId;
//     }
//     // Search
//     if (cleanSearch) {
//       query.firmName = {
//         $regex: cleanSearch,
//         $options: "i",
//       };
//     }
//     const total = await Shopuser.countDocuments(query);
//     const shops = await Shopuser.find(query)
//       .skip(skip)
//       .limit(limit)
//       .sort({ createdAt: -1 });
//     return {
//       total,
//       page,
//       limit,
//       totalPages: Math.ceil(total / limit),
//       data: shops,
//     };
//   } catch (error) {
//     throw error;
//   }
// };

export const UpdateShopservice = async (shopId, body) => {
  try {
    // Hash password if updated
    // if (body.password) {
    //   body.password = await bcrypt.hash(body.password, 10);
    // }
    // find distributor first
    const shopuser = await Shopuser.findById(shopId);

    if (!shopuser) {
      throw new Error("Shop user not found");
    }

    // update user table
    await User.findByIdAndUpdate(shopuser.userId, {
      name: body.name,
      email: body.email,
      mobile: body.mobile,
    });

    // update distributor table
    const updateshopuser = await Shopuser.findByIdAndUpdate(shopId, body, {
      new: true,
      runValidators: true,
    });
    return updateshopuser;
  } catch (error) {
    throw error;
  }
};

export const DeleteShopservice = async (shopId) => {
  try {
    const shopuser = await Shopuser.findById(shopId);

    if (!shopuser) {
      throw new Error(" shopuser  not found");
    }

    // delete user
    await User.findByIdAndDelete(shopuser.userId);

    // delete distributor
    await Shopuser.findByIdAndDelete(shopId);

    return shopuser;
  } catch (error) {
    throw error;
  }
};
