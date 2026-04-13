import User from "../../models/User/User.js";
import Customer from "../../models/User/Customer.js";
import Product from "../../models/User/product.js";


export const  DistributorDashboardService = async () => {
    try{
    const totaluser =await User.countDocuments({
        role:"user"
    });
    const totaproduct =await Product.countDocuments();

    const totalcustomer =await Customer.countDocuments();

     return {
         totaluser,
         totaproduct,
         totalcustomer,
    };
  } catch (error) {
    console.error(error);
    
  }
}