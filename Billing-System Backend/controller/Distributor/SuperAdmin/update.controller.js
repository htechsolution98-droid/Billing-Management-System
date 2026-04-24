import { UpdateUserservice } from "../../../service/Distributor/Superadmin/disupdate.service.js";

export const updateUsercontroller = async (req, res, next) => {
  try {
    const { id } = req.params;

    const body = { ...req.body };

    // Handle file upload
    if (req.file) {
      body.corpo_certino = req.file.filename;
    }

    const updatedUser = await UpdateUserservice(id, body);

    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
