import Product from "../../../models/User/product.js";
export const Deleteproductservice = async (productId) => {
  try {
    const deletedproduct = await Product.findByIdAndDelete(productId);

    if (!deletedproduct) {
      throw new Error("Product not found");
    }

    return deletedproduct;
  } catch (error) {
    throw error;
  }
};
