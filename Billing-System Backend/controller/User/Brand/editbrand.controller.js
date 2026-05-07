import { Brandeditservice } from "../../../service/User/Brand/brandedit.service.js";

export const editBrandController = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedBrand = await Brandeditservice(id, req.body);

    return res.status(200).json({
      success: true,
      message: "Brand updated successfully",
      data: updatedBrand,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
