import { DeleteDistservice } from "../../../service/Distributor/Superadmin/disdelete.service.js";

export const deleteDistcontroller = async (req, res, next) => {
  try {

    const { id } = req.params;

    console.log("Delete ID:", id);

    const deletedUser =
      await DeleteDistservice(id);

    res.status(200).json({
      message: "User deleted successfully ✅",
      data: deletedUser,
    });

  } catch (error) {

    console.error(error);

    next(error);

  }
};