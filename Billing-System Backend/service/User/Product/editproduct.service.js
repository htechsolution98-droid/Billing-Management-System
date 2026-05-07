import Product from "../../../models/User/product.js";

export const Updateproductservice = async (productId, body) => {
  try {
    // Hash password if updated
    // if (body.password) {
    //   body.password = await bcrypt.hash(body.password, 10);
    // }

    const updatedproduct = await Product.findByIdAndUpdate(productId, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedproduct) {
      throw new Error("Product not found");
    }

    return updatedproduct;
  } catch (error) {
    throw error;
  }
};
