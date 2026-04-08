import Brand from "../../../models/User/Brand.js";

export const GetBrandService = async () => {

  return await Brand.find();

};