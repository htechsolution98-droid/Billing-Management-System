import Product from "../../models/product";
export const GetProductSevice = async (data) => {
    return await Product.create(data);
}
// export const ProductSevice = async (data) => {
//     return await Product.find(data);
// }
// export const ProductSevice = async (data) => {
//     return await Product.findByIdAndUpdate(data);
// }
// export const ProductSevice = async (data) => {
//     return await Product.findByIdAndDelete(data);
// }