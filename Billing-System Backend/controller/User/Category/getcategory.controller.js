import { GetCategoryService } from "../../../service/User/Category/getcategory.service.js";

export const GetCategoryController = async (req, res) => {
  try {
    const data = await GetCategoryService(req.user._id);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
