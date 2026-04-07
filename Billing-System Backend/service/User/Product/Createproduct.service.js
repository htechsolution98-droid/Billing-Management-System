import Product from "../../../models/User/product.js"

export const CreateProductservice = async (data) => {
    return await Product.create(data)
}