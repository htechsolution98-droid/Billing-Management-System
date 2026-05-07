import { GetProductservice } from "../../../service/User/Product/Getproduct.service.js";
import User from "../../../models/User/User.js";
import Product from "../../../models/User/product.js";

export const GetProductController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    const data = await GetProductservice(req.user._id, page, limit, search);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const GetproductByUsercode = async (req,res) => {
  try {
    const { usercode } = req.body;
    const user = await User.findOne({
        usercode: usercode,
    });

    if (!user) {
     return res.status(404).json({
        sucsess:false,
        msg:"User Not Found"});
    }

    //Fetch Products
    const products = await Product.find({
      userId:user._id,
    })

  return res.status(200).json({
      sucsess:true,
      msg:"Product Fetch",
      products,
      UserName:user.name
    })

  } catch (error) {

    return res.status(500).json({
      sucsess:false,
      msg:error.message
    })
    console.error(error);
    
  }
}