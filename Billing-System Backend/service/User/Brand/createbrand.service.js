import Brand from "../../../models/User/Brand.js";

export const CreateBrandService = async (body) => {

  return await Brand.create(body);

};