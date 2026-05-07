import { Updateproductservice } from "../../../service/User/Product/editproduct.service.js";


export const updateNusercontroller = async (req, res, next) => {
  try {
    const { id } = req.params;

    const body = { ...req.body };

    // Handle file upload and retained images
    let updatedImages = [];
    
    // Parse retained images if they exist (can be a string or array)
    if (body.retainedImages) {
      if (typeof body.retainedImages === "string") {
        try {
          updatedImages = JSON.parse(body.retainedImages);
        } catch (e) {
          updatedImages = [body.retainedImages];
        }
      } else if (Array.isArray(body.retainedImages)) {
        updatedImages = body.retainedImages;
      }
    }

    // Add new uploaded files
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(
        (file) => `/uploads/ProductImg/${file.filename}`
      );
      updatedImages = [...updatedImages, ...newImages];
    }

    if (updatedImages.length > 0) {
      body.productImage = updatedImages;
    } else if (body.productImage === undefined || body.productImage === null) {
      // If the frontend explicitly cleared all images, we should set it to empty array.
      // Assuming frontend sends something indicating clearing if neither files nor retainedImages exist.
      body.productImage = [];
    }

    // Parse variants if sent as a JSON string
    if (typeof body.variants === "string") {
      try {
        body.variants = JSON.parse(body.variants);
      } catch (e) {
        console.error("Error parsing variants:", e);
      }
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
