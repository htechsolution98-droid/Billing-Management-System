import { CreateCategoryService } from "../../../service/User/Category/createcategory.service.js";

export const CreateCategoryController = async (req, res) => {

  try {

    const body = {
      ...req.body,
      userId: req.user._id,
    };
    const data = await CreateCategoryService(body);

    res.status(200).json({
      msg: "Category Created",
      data,
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }

};
