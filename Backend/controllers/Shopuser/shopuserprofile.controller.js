import Shopuser from "../../models/Shop.js";
import Customer from "../../models/Customer.js"
//Getshopuser Profile data

export const getshopuserProfileController = async (req, res) => {
  try {
    // req.user comes from auth middleware
    const shopuserId = req.user._id;

    const shopuser = await Shopuser.findById(shopuserId).select("-password");
    // exclude password only

    if (!shopuser) {
      return res.status(404).json({
        success: false,
        message: "Shopuser not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: shopuser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Update user Profile data
export const updateshopuserProfileController = async (req, res) => {
  try {
    const shopuserId = req.user._id;

    const updateData = {
      ...req.body,
    };

    if (req.file) {
      updateData.profileImage = req.file.path;
    }

    const shopuser = await DistrictDistributor.findByIdAndUpdate(
      shopuserId,
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: shopuser,
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
export const Latestcustomerget = async (req, res) => {
  try {
    const latest = await Customer.find().sort({ createdAt: -1 }).limit(5);
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
