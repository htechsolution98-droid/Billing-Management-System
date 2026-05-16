import StateDistributor from "../../models/StateDist.js";
import User from "../../models/User.js";
export const CreateDist = async (data) => {
  return await StateDistributor.create(data);
};

export const Getstatedistservice = async (
  userId,
  page = 1,
  limit = 5,
  search = "",
) => {
  try {
    const skip = (page - 1) * limit;
    const cleanSearch = (search || "").trim();
    const query= {}
    if (cleanSearch.length > 0) {
      query.firmName = {
        $regex: cleanSearch,
        $options: "i",
      };
    }
    const total = await StateDistributor.countDocuments(query);
    const stateusers = await StateDistributor.find(query)
    .populate("userId", "name email mobile password role")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: stateusers,
    };
  } catch (error) {
    throw error;
  }
};

export const Updatestatedistservice = async (stateId, body) => {
  try {
    // Hash password if updated
    // if (body.password) {
    //   body.password = await bcrypt.hash(body.password, 10);
    // }
    // find distributor first
    const distributor = await StateDistributor.findById(stateId);

    if (!distributor) {
      throw new Error("State Dist not found");
    }

    // update user table
    await User.findByIdAndUpdate(distributor.userId, {
      name: body.name,
      email: body.email,
      mobile: body.mobile,
    });

    // update distributor table
    const updatestatedist = await StateDistributor.findByIdAndUpdate(
      stateId,
      body,
      {
        new: true,
        runValidators: true,
      },
    );
    return updatestatedist;
  } catch (error) {
    throw error;
  }
};

export const Deletestatedistservice = async (stateId) => {
  try {
    const distributor = await StateDistributor.findById(stateId);

    if (!distributor) {
      throw new Error("District Dist not found");
    }

    // delete user
    await User.findByIdAndDelete(distributor.userId);

    // delete distributor
    await StateDistributor.findByIdAndDelete(stateId);

    return distributor;
  } catch (error) {
    throw error;
  }
};
