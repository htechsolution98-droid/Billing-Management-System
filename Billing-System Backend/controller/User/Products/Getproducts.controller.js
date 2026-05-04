import { GetProductservice } from "../../../service/User/Product/Getproduct.service.js";

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
