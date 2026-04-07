import { CreateProductservice } from "../../../service/User/Product/Createproduct.service.js";
export const createProductcontroller = async (req, res) => {
  try {
    const body = req.body;
    // console.log("Uploaded File", req.file);
    // console.log(body);

    //Firmlogoo upload
    if (req.file) {
      body.productImage = req.file.filename;
    }
    const data = await CreateProductservice(req.body);
    res.status(200).json({ msg: "Nuser Added", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
