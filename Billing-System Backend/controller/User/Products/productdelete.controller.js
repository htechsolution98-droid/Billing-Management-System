import { Deleteproductservice } from "../../../service/User/Product/deleteproduct.service.js";

export const deleteproductcontroller = async (req, res, next) => {
  try {
    const { id } = req.params;

    console.log("Delete ID:", id);

    const deletedproduct = await Deleteproductservice(id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: deletedproduct,
    });
  } catch (error) {
    console.error(error);

    if (error.message === "Product not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Error deleting Product",
      error: error.message,
    });
  }
};
