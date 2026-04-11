import { createCustomerservice } from "../../../service/User/Customer/create.customer.service.js";

export const createcustocontroller = async (req, res) => {
  try {
    // body.userId = req.user._id;
    const data =await createCustomerservice(req.body);
    res.status(200).json({ msg: "Customer Crwated", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
    
  }
};
