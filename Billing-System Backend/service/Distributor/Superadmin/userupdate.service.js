import User from "../../../models/User/User.js";

export const UpdateNuserservice = async (userId, body) => {
  try {
    // Hash password if updated
    // if (body.password) {
    //   body.password = await bcrypt.hash(body.password, 10);
    // }

    const updatedUser = await User.findByIdAndUpdate(userId, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
  } catch (error) {
    throw error;
  }
};
