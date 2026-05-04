import { Categoryeditservice } from "../../../service/User/Category/categoryedit.service.js";

export const editcategoryController = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedcate = await Categoryeditservice(id, req.body);

    return res.status(200).json({
      success: true,
      message: "Brand updated successfully",
      data: updatedcate,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
