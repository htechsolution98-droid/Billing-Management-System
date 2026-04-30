import { Updateproductservice } from "../../../service/User/Product/editproduct.service.js";


export const updateNusercontroller = async (req, res, next) => {
  try {
    const { id } = req.params;

    const body = { ...req.body };

    // Handle file upload
    if (req.file) {
      body.productImage = req.file.filename;
    }

    const updatedproduct = await Updateproductservice(id, body);

    res.status(200).json({
      message: "Product updated successfully",
      data: updatedproduct,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
