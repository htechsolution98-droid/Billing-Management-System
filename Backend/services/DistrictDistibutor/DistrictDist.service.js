import DistrictDistributor from "../../models/DistrictDist.js";
import User from "../../models/User.js";
export const CreateDistrictDistService = async (data) => {
  return await DistrictDistributor.create(data);
};

export const GetDistrictdistservice = async (
  userId,
  role,
  page,
  limit,
  search,
) => {
  try {
    const skip = (page - 1) * limit;
    const cleanSearch = (search || "").trim();

    let query = {};

    // SUPER ADMIN
    if (role === "SUPER_ADMIN") {
      query = {};
    }

    // STATE DISTRIBUTOR
    else if (role === "STATE_DISTRIBUTOR") {
      query.createdBy = userId;
    }
    // SEARCH
    if (cleanSearch) {
      query.firmName = {
        $regex: cleanSearch,
        $options: "i",
      };
    }

    const districts = await DistrictDistributor.find(query)
      .populate("userId")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await DistrictDistributor.countDocuments(query);

    return {
      success: true,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      data: districts,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
//   userId,
//   role,
//   page = 1,
//   limit = 5,
//   search = "",
// ) => {
//   const skip = (page - 1) * limit;
//   const cleanSearch = (search || "").toString().trim();
//   let query = {};

//   if (role === "STATE_DISTRIBUTOR") {
//     query.stateDistributorId = userId;
//   }

//   if (cleanSearch) {
//     query.firmName = {
//       $regex: cleanSearch,
//       $options: "i",
//     };
//   }

//   const total = await DistrictDistributor.countDocuments(query);
//   const users = await DistrictDistributor.find(query)
//     .skip(skip)
//     .limit(limit)
//     .sort({ createdAt: -1 });

//   return {
//     total,
//     page,
//     limit,
//     totalPages: Math.ceil(total / limit),
//     data: users,
//   };
// };

export const UpdateDistrictdistservice = async (distId, body) => {
  try {
    // Hash password if updated
    // if (body.password) {
    //   body.password = await bcrypt.hash(body.password, 10);
    // }
    // find distributor first
    const distributor = await DistrictDistributor.findById(distId);

    if (!distributor) {
      throw new Error("District Dist not found");
    }

    // update user table
    await User.findByIdAndUpdate(distributor.userId, {
      name: body.name,
      email: body.email,
      mobile: body.mobile,
    });

    // update distributor table
    const updateDistdist = await DistrictDistributor.findByIdAndUpdate(
      distId,
      body,
      {
        new: true,
        runValidators: true,
      },
    );
    return updateDistdist;
  } catch (error) {
    console.error(error);
  }
};

export const DeleteDistrictdistservice = async (distId) => {
  try {
    const distributor = await DistrictDistributor.findById(distId);

    if (!distributor) {
      throw new Error("State Dist not found");
    }

    // delete user
    await User.findByIdAndDelete(distributor.userId);

    // delete distributor
    await DistrictDistributor.findByIdAndDelete(distId);

    return distributor;
  } catch (error) {
    console.error(error);
  }
};
