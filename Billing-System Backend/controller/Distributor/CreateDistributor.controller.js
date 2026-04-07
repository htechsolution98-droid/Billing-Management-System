import { CreateDistributorservice } from "../../service/Distributor/CreateDistributor.service.js";
// import {upload} from "../../config/multer.js"
export const createcontroller = async (req, res, next) => {
  try {
    const { password, confirmPassword } = req.body;
     const body = req.body;
    console.log(password, confirmPassword);
    console.log("Uploaded File",req.file);
    console.log(body);
    

    // Confirm Password Check
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password and Confirm Password do not match",
      });
    }

    //Comapny corporate certino upload 
    if (req.file) {
      body.corpo_certino= req.file.filename;
    }

    const data = await CreateDistributorservice(req.body);

    res.status(201).json({message: "Distributor Added Successfully",data,});
  } catch (error) {
    next(error); 
  }
};
