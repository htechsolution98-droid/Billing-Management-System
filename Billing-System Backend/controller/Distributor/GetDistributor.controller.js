import { GetDistributorservice } from "../../service/Distributor/GetDistributor.service.js";
import Distributor from "../../models/Distributor/Distributor.js";

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

//GetUser Profile data
export const getDistProfileController = async (req, res) => {
  try {
    // req.user comes from auth middleware
    const distId = req.user._id;

    const dist = await Distributor.findById(distId).select("-password");
    // 🔐 exclude password only

    if (!dist) {
      return res.status(404).json({
        success: false,
        message: "Distributor not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: dist,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Update user Profile data
export const updateDistProfileController = async (req, res) => {
  try {
    const distId = req.user._id;

    // if (req.file) {
    //   req.body.firmLogo = req.file.path.replace(/\\/g, "/");
    // }

    const updatedDist = await Distributor.findByIdAndUpdate(distId, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedDist,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update profile",
    });
  }
};

export const LatestDistributortget = async (req, res) => {
  try {
    const latest = await Distributor.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("-password");
    res.status(200).json({
      success: true,
      latest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
    console.error(error);
  }
};
