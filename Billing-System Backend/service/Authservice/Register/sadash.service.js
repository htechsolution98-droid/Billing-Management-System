import User from "../../../models/User/User.js";
import Customer from "../../../models/User/Customer.js";
import Product from "../../../models/User/product.js";
import Distributor from "../../../models/Distributor/Distributor.js";

export const SuperAdminDashboardService = async () => {
  try {
    // 1️ Count Distributors
    const totalDistributor = await Distributor.countDocuments({
      role: "distributor",
    });

    // 2️ Count Nusers
    const totalNuser = await User.countDocuments({
      role: "user",
    });

    // 3️ Count Customers
    const totalCustomer = await Customer.countDocuments();

    // 4️ Count Products
    const totalProduct = await Product.countDocuments();

    // // 5️ Count Orders
    // const totalOrder = await Order.countDocuments();

    // // 6️ Calculate Total Sales
    // const totalSalesData = await Order.aggregate([
    //   {
    //     $group: {
    //       _id: null,
    //       totalSales: { $sum: "$totalAmount" },
    //     },
    //   },
    // ]);

    // const totalSales =
    //   totalSalesData.length > 0 ? totalSalesData[0].totalSales : 0;

    return {
      totalDistributor,
      totalNuser,
      totalCustomer,
      totalProduct,
    };
  } catch (error) {
    console.error(error);
    
  }
};
