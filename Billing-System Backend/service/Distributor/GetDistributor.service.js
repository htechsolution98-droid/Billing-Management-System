import Distributor from "../../models/Distributor/Distributor.js"

export const GetDistributorservice = async (page = 1, limit = 5) => {
  const skip = (page - 1) * limit;
  const total = await Distributor.countDocuments();
  const users = await Distributor.find()
    .populate("superAdminId", "name")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    data: users,
  };
};