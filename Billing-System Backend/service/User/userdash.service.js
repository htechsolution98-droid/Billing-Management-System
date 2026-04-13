import Customer from "../../models/User/Customer.js";
import Product from "../../models/User/product.js";
import brand from "../../models/User/Brand.js";
import category from "../../models/User/Category.js";


export const  NuserDashboardService = async () => {
    try{
    const totalbrand =await brand.countDocuments();

    const totaproduct =await Product.countDocuments();

    const totalcustomer =await Customer.countDocuments();

    const totalcategory =await category.countDocuments();

     return {
         totalbrand,
         totaproduct,
         totalcustomer,
         totalcategory,
    };
  } catch (error) {
    console.error(error);
    
  }
}