import { SearchUserservice } from "../../../service/Distributor/Superadmin/serchapi.service.js";

export const SerchdisController = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const users = await SearchUserservice(keyword);

    res.status(200).json({
      count: users.length,
      data: users
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Search failed"
    });
  }
};