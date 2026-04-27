import {GetDistributorservice} from "../../service/Distributor/GetDistributor.service.js";

export const GetDistributorController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const data = await GetDistributorservice(page, limit);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};