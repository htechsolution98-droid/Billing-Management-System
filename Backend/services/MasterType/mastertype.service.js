import MasterType from "../../models/Mastertype.js";

export const CreateMasterservice = async (data) => {
  return await MasterType.create(data);
};

export const Getmasterservice = async (
//   userId,
  page = 1,
  limit = 5,
  search = "",
) => {
  try {
    const skip = (page - 1) * limit;
    const cleanSearch = (search || "").toString().trim();

    const query = {
      userId: userId,
      ...(cleanSearch && {
        name: { $regex: cleanSearch, $options: "i" },
      }),
    };
    const total = await MasterType.countDocuments(query);
    const Master = await MasterType.find(query)
      .skip(skip)
      .limit(limit)
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

export const Updatemasterservice = async (MasterId, body) => {
  try {
    // Hash password if updated
    // if (body.password) {
    //   body.password = await bcrypt.hash(body.password, 10);
    // }
    // find distributor first
    const Masterfind = await MasterType.findById(MasterId);

    if (!Masterfind) {
      throw new Error("MasterType not found");
    }

    // update distributor table
    const updateMaster = await MasterType.findByIdAndUpdate(MasterId, body, {
      new: true,
      runValidators: true,
    });
    return updateMaster;
  } catch (error) {
    throw error;
  }
};

export const Deletemasterservice = async (MasterId) => {
  try {
    const Masterdelete = await MasterType.findById(MasterId);

    if (!Masterdelete) {
      throw new Error("Master not found");
    }

    return Masterdelete;
  } catch (error) {
    throw error;
  }
};
