import User from "../../../models/User/User.js";
export const DeleteNuserservice = async (userId) => {
  try {

    const deletedUser =
      await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      throw new Error("User not found");
    }

    return deletedUser;

  } catch (error) {
    throw error;
  }
};