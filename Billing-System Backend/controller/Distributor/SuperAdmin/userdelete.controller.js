import { DeleteNuserservice } from "../../../service/Distributor/Superadmin/userdelete.service.js";

export const deleteNusercontroller = async (req, res, next) => {
  try {
    const { id } = req.params;

    console.log("Delete ID:", id);

    const deletedUser = await DeleteNuserservice(id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    console.error(error);

    if (error.message === "User not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Error deleting user",
      error: error.message,
    });
  }
};
