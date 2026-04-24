import User from "../../../models/User/User.js";
import Customer from "../../../models/User/Customer.js";
import Product from "../../../models/User/product.js";
import Distributor from "../../../models/Distributor/Distributor.js";

export const SuperAdminDashboardService = async () => {
  try {
    const [totalDistributor, totalNuser, totalCustomer, totalProduct] =
      await Promise.all([
        Distributor.countDocuments({ role: "distributor" }),
        User.countDocuments({ role: { $in: ["nuser", "user"] } }),
        Customer.countDocuments(),
        Product.countDocuments(),
      ]);

    return {
      totalDistributor,
      totalNuser,
      totalCustomer,
      totalProduct,
      totalBills: 0,
      totalRevenue: 0,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
