import { DeleteNuserservice } from "../../../service/Distributor/User/userdelete.service.js";


export const deleteNusercontroller = async (req, res, next) => {
  try {

    const { id } = req.params;

    console.log("Delete ID:", id);

    const deletedUser =
      await DeleteNuserservice(id);

    res.status(200).json({
      message: "User deleted successfully ✅",
      data: deletedUser,
    });

  } catch (error) {

    console.error(error);

    next(error);

  }
};