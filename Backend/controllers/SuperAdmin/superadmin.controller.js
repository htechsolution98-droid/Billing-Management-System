import StateDistributor from "../../models/StateDist.js";
import User from "../../models/User.js";
export const activatestateDistributor = async (req, res) => {
  try {
    const { id } = req.params;

    const statedistributor = await StateDistributor.findByIdAndUpdate(
      id,
      { isActive: true },
      { new: true },
    );

    res.status(200).json({
      success: true,
      message: "StateDistributor activated successfully",
      statedistributor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error activating distributor",
    });
  }
};

export const diactvatestatedistcontroller = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id, "diactvate id ");

    const diactivate = await StateDistributor.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true },
    );

    if (!diactivate) {
      return res
        .status(400)
        .json({ success: false, message: "StateDistributor Not Found" });
    }

    res.status(200).json({
      success: true,
      message: "Stateistributor Diactivated Successfully",
      distributor: diactivate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in distributor",
      error: error.message,
    });
  }
};

//latest userget
export const LateststateDistributortget = async (req, res) => {
  try {
    const latest = await StateDistributor.find()
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

//GetSuperadmin Profile data
export const getSuperadminProfileController = async (req, res) => {
  try {
    // req.user comes from auth middleware
    const saId = req.user._id;

    const admin = await User.findById(saId);
    // exclude password only

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "SuperAdmin not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Update user Profile data
export const updateSuperadminProfileController = async (req, res) => {
  try {
    const saId = req.user._id;

    const updateData = {
      ...req.body,
    };

    if (req.file) {
      updateData.profileImage = req.file.path;
    }

    const updatedsa = await User.findByIdAndUpdate(saId, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedsa,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update profile",
    });
  }
};
