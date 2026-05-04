import { GetBrandByCategoryService } from "../../../service/User/Brand/Getcategwisebrand.service.js";

export const GetBrandByCategoryController = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const data = await GetBrandByCategoryService(categoryId, req.user._id);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
