import { getCustomerservice } from "../../../service/User/Customer/get.customer.service.js";

export const getcustocontroller = async (req, res) => {
  try {
    const data =await getCustomerservice();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
