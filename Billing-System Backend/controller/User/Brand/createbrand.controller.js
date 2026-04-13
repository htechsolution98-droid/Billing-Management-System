import { CreateBrandService } from "../../../service/User/Brand/createbrand.service.js";

export const CreateBrandController = async (req, res) => {
  try {
    const body = {...req.body,userId: req.user._id,};
    console.log(body,"barndcont");
    
    const data = await CreateBrandService(body);

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
