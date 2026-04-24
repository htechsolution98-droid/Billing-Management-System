import { UpdateNuserservice } from "../../../service/Distributor/User/userupdate.service.js";


export const updateNusercontroller = async (req, res, next) => {
  try {
    const { id } = req.params;

    const body = { ...req.body };

    // Handle file upload
    if (req.file) {
      body.firmLogo = req.file.filename;
    }

    const updatedUser = await UpdateNuserservice(id, body);

    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
