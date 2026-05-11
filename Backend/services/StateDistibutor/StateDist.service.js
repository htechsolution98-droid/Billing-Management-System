import StateDistributor from "../../models/StateDist.js";

export const CreateDist = async (data) => {
  return await StateDistributor.create(data);
};

export const Getstatedistservice = async (
  userId,
  page = 1,
  limit = 5,
  search = "",
) => {
  const skip = (page - 1) * limit;
  const cleanSearch = (search || "").toString().trim();

  const query = {
    userId: userId,
    ...(cleanSearch && {
      productName: { $regex: cleanSearch, $options: "i" },
    }),
  };
  const total = await StateDistributor.countDocuments(query);
  const stateusers = await StateDistributor.find(query)
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
};

export const Updatestatedistservice = async (stateId, body) => {
  try {
    // Hash password if updated
    // if (body.password) {
    //   body.password = await bcrypt.hash(body.password, 10);
    // }

    const updatestatedist = await StateDistributor.findByIdAndUpdate(
      stateId,
      body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatestatedist) {
      throw new Error("State Dist not found");
    }

    return updatestatedist;
  } catch (error) {
    throw error;
  }
};

export const Deletestatedistservice = async (stateId) => {
  try {
    const deletestatedist = await StateDistributor.findByIdAndDelete(stateId);

    if (!deletestatedist) {
      throw new Error("State Dist not found");
    }

    return deletestatedist;
  } catch (error) {
    throw error;
  }
};
