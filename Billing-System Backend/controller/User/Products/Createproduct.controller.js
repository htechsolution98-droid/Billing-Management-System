import { CreateProductservice } from "../../../service/User/Product/Createproduct.service.js";
import mongoose from "mongoose";

export const createProductcontroller = async (req, res) => {
  try {
    //************************************************** */
    const body = { ...req.body, userId: req.user._id };
    // console.log("Uploaded File", req.file);

    // productImage upload - store relative path for better portability
    if (req.files && req.files.length > 0) {
      body.productImage = req.files.map(
        (file) => `/uploads/ProductImg/${file.filename}`
      );
    }
    // Parse variants if sent as a JSON string (common in multipart/form-data)
    if (typeof body.variants === "string") {
      try {
        body.variants = JSON.parse(body.variants);
      } catch (e) {
        console.error("Error parsing variants:", e);
      }
    }

    const data = await CreateProductservice(body);
    res.status(200).json({ msg: "Nuser Added", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
