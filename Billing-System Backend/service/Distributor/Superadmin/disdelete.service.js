import Distributor from "../../../models/Distributor/Distributor.js";
export const DeleteUserservice = async (userId) => {
  try {

    const deletedUser =
      await Distributor.findByIdAndDelete(userId);

    if (!deletedUser) {
      throw new Error("User not found");
    }

    return deletedUser;

  } catch (error) {
    throw error;
  }
};