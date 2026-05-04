import { Deletebrandservice } from "../../../service/User/Brand/branddelet.service.js";

export const deleteBrandController = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBrand = await Deletebrandservice(id);

    return res.status(200).json({
      success: true,
      message: "Brand deleted successfully",
      data: deletedBrand,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};