import { CreateProductservice } from "../../../service/User/Product/Createproduct.service.js";
export const createProductcontroller = async (req, res) => {
  try {
      const body = {...req.body,userId: req.user._id,};
    console.log("Uploaded File", req.file);
    // console.log(body);

    //productImage upload
    if (req.file) {
      body.productImage = req.file.filename;
    }
    // const userId = req.user._id; // logged-in nuser
    const data = await CreateProductservice(body);
    res.status(200).json({ msg: "Nuser Added", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
