import User from "../../../models/User/User.js";
import bcrypt from "bcrypt";


export const UpdateNuserservice = async (userId, body) => {
  try {
     const updateData = { ...body };

    // Normalize email
    if (updateData.email) {
      updateData.email = updateData.email.trim().toLowerCase();
    }

    // ✅ SIMPLE PASSWORD LOGIC (same as distributor)
    if (updateData.password && updateData.password.trim() !== "") {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    } else {
      delete updateData.password;
    }
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      returnDocument: "after",
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
