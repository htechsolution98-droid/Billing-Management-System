import { UpdateDistservice } from "../../../service/Distributor/Superadmin/disupdate.service.js";
import bcrypt from "bcrypt";

export const updateDistcontroller = async (req, res, next) => {
  try {
    const { id } = req.params;

    const body = { ...req.body };
   

    // Hash password
    if (body.password) {
      body.confirmPassword = body.password;
      body.password = await bcrypt.hash(body.password, 10);
      
    }

    // Handle file upload
    if (req.file) {
      body.corpo_certino = req.file.filename;
    }

    const updatedUser = await UpdateDistservice(id, body);

    res.status(200).json({
      message: "Distributor updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
