import { Deletecategoryservice } from "../../../service/User/Category/categorydelet.service.js";

export const deletecategoryController = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedcate = await Deletecategoryservice(id);

    return res.status(200).json({
      success: true,
      message: "category deleted successfully",
      data: deletedcate,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};