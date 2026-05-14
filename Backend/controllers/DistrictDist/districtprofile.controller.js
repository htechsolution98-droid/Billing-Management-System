import DistrictDistributor from "../../models/DistrictDist.js"
import Shopuser from "../../models/Shop.js"
//Getshopuser Profile data

export const getdistrictProfileController = async (req, res) => {
  try {
    // req.user comes from auth middleware
    const DistrictId = req.user._id;

    const districtDistributor = await DistrictDistributor.findById(DistrictId).select("-password");
    // exclude password only

    if (!districtDistributor) {
      return res.status(404).json({
        success: false,
        message: "DistrictDistributor not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: districtDistributor,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Update user Profile data
export const updatedistrictdistProfileController = async (req, res) => {
  try {
    const DistrictId = req.user._id;

   const updateData = {
      ...req.body,
    };

    if (req.file) {
      updateData.profileImage = req.file.path;
    }

    const District = await DistrictDistributor.findByIdAndUpdate(DistrictId, updateData, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: District,
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
export const LatestShopuserget = async (req, res) => {
  try {
    const latest = await Shopuser.find()
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
