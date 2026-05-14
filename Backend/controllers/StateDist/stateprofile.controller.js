import StateDistributor from "../../models/StateDist.js";
import DistrictDistributor from "../../models/DistrictDist.js"

//GetSuperadmin Profile data
export const getstateDistProfileController = async (req, res) => {
  try {
    // req.user comes from auth middleware
    const distId = req.user._id;

    const dist = await StateDistributor.findById(distId)
    .select("-password");
    // exclude password only

    if (!dist) {
      return res.status(404).json({
        success: false,
        message: "StateDistributor not found",
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
export const updatestateDistProfileController = async (req, res) => {
  try {
    const distId = req.user._id;

    // if (req.file) {
    //   req.body.firmLogo = req.file.path.replace(/\\/g, "/");
    // }

    const updatedDist = await StateDistributor.findByIdAndUpdate(distId, req.body, {
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


//latest userget
export const LatestDistdistributortget = async (req, res) => {
  try {
    const latest = await DistrictDistributor.find()
      .sort({ createdAt: -1 })
      .limit(5);
    // .select("-password");
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

