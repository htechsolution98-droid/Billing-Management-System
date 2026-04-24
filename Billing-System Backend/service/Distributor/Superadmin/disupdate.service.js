import Distributor from "../../../models/Distributor/Distributor.js";

export const UpdateUserservice = async (userId, body) => {
  try {
    const updatedUser = await Distributor.findByIdAndUpdate(
      userId,
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
  } catch (error) {
    throw error;
  }
};