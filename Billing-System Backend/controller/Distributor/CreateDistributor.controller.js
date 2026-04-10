import { CreateDistributorservice } from "../../service/Distributor/CreateDistributor.service.js";
// import {upload} from "../../config/multer.js"
export const createcontroller = async (req, res, next) => {
  try {
    const { password, confirmPassword } = req.body;
    const body = { ...req.body };

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password and Confirm Password do not match",
      });
    }

    if (req.file) {
      body.corpo_certino = req.file.filename;
    }

    body.superAdminId = req.user._id;

    const data = await CreateDistributorservice(body);

    res.status(201).json({ message: "Distributor Added Successfully", data });
  } catch (error) {
    next(error);
  }
};

