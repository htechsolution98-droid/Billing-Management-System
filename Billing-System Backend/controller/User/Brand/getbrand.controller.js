import {GetBrandService}  from "../../../service/User/Brand/getbrand.service.js";


export const GetBrandController = async (req, res) => {
  try {
    const data = await GetBrandService();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
