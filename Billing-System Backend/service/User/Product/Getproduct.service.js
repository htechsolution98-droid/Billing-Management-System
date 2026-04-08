import Product from "../../../models/User/product.js";

export const GetProductservice = async () => {
  return await Product.find()
    .populate("categoryId", "categoryName")
    .populate("brandId", "brandName");
};
