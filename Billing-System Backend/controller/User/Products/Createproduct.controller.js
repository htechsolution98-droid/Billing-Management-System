import { CreateProductservice } from "../../../service/User/Product/Createproduct.service.js";
import mongoose from "mongoose";

export const createProductcontroller = async (req, res) => {
  try {
    //************************************************** */
    const body = { ...req.body, userId: req.user._id };
    console.log("Uploaded File", req.file);
    // console.log(body);

    // ["categoryId", "brandId"].forEach((field) => {
    //   if (body[field] === "") {
    //     delete body[field];
    //   }
    // });

    // if (body.categoryId && !mongoose.Types.ObjectId.isValid(body.categoryId)) {
    //   return res.status(400).json({ error: "Invalid category id" });
    // }

    // if (body.brandId && !mongoose.Types.ObjectId.isValid(body.brandId)) {
    //   return res.status(400).json({ error: "Invalid brand id" });
    // }

    //productImage upload
    if (req.file) {
      body.productImage = `${req.protocol}://${req.get("host")}/uploads/ProductImg/${req.file.filename}`;
    }
    // const userId = req.user._id; // logged-in nuser
    const data = await CreateProductservice(body);
    res.status(200).json({ msg: "Nuser Added", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
