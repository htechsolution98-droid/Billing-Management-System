import { CreateDistrictDistService } from "../../services/DistrictDistibutor/DistrictDist.service.js";
import { GetDistrictdistservice } from "../../services/DistrictDistibutor/DistrictDist.service.js";
import { UpdateDistrictdistservice } from "../../services/DistrictDistibutor/DistrictDist.service.js";
import { DeleteDistrictdistservice } from "../../services/DistrictDistibutor/DistrictDist.service.js";
import User from "../../models/User.js";

export const CreateDistrictDistController = async (req, res) => {
  try {
    // 1. extract body here
    const { name, email, mobile, password } = req.body;

    // 2. uploaded file path
    let corpo_certificatno = "";

    if (req.file) {
      corpo_certificatno = req.file.path;
    }

    // 2. create user
    const user = await User.create({
      name,
      email,
      mobile,
      password,
      role: "DISTRICT_DISTRIBUTOR",
      createdBy: req.user._id,
    });
    // 3. create distributor
    const dist = await CreateDistrictDistService({
      ...req.body,
      userId: user._id,
      createdBy: req.user._id,
    });
    res.status(201).json({
      success: true,
      msg: "DISTRICT_DISTRIBUTOR Create Sucsesfully ",
      data: dist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "DISTRICT_DISTRIBUTOR Can't Be Create Sucsesfully ",
    });
    console.error(error);
  }
};

export const GetDistdistController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    const data = await GetDistrictdistservice(
      req.user._id,
      req.user.role,
      page,
      limit,
      search,
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateDistdistcontroller = async (req, res, next) => {
  try {
    // if (req.user.role !== "SUPER_ADMIN" && req.user.role !==  "STATE_DISTRIBUTOR") {
    //   return res.status(403).json({
    //     message: "Access denied",
    //   });
    // }

    const { id } = req.params;

    const body = { ...req.body };

    const updateddist = await UpdateDistrictdistservice(id, body);

    res.status(200).json({
      message: "StateDist updated successfully",
      data: updateddist,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const DeleteDistdistcontroller = async (req, res, next) => {
  try {
    // if (req.user.role !== "SUPER_ADMIN" && req.user.role !==  "STATE_DISTRIBUTOR") {
    //   return res.status(403).json({
    //     message: "Access denied",
    //   });
    // }
    const { id } = req.params;

    // console.log("Delete ID:", id);

    const deletedist = await DeleteDistrictdistservice(id);

    res.status(200).json({
      success: true,
      message: "StateDistibutor deleted successfully",
      data: deletedist,
    });
  } catch (error) {
    next(error);
  }
};
