import { CreateBrandService } from "../../../service/User/Brand/createbrand.service.js";

export const CreateBrandController = async (req, res) => {
  try {
    const data = await CreateBrandService(req.body);

    res.status(200).json({
      msg: "Brand Created",
      data,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
