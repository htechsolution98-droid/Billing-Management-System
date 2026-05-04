import User from "../../models/User/User.js";

export const GetuserController = async (req, res) => {
  try {
    let query = {};

    if (req.user.role === "distributor") {
      query.distributorId = req.user._id;
    } else if (req.user.role === "superadmin") {
      if (req.query.distributorId) {
        query.distributorId = req.query.distributorId;
      }
      // If superadmin doesn't provide a distributorId, we'll fetch all NUsers
    } else {
      return res.status(403).json({ message: "Unauthorized role" });
    }

    const users = await User.find(query)
      .populate("distributorId", "name distributorCode")
      .populate("superAdminId", "name");

    return res.status(200).json({
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error("GetUser Error:", error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

//GetUser Profile data
export const getProfileController = async (req, res) => {
  try {
    // req.user comes from auth middleware
    const userId = req.user._id;

    const user = await User.findById(userId).select("-password");
    // 🔐 exclude password only

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Update user Profile data
export const updateProfileController = async (req, res) => {
  try {
    const userId = req.user._id;

    // if (req.file) {
    //   req.body.firmLogo = req.file.path.replace(/\\/g, "/");
    // }

    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update profile",
    });
  }
};
// export const GetuserController = async (req, res) => {
//   try {
//     console.log("Logged User:", req.user);

//     let distributorId;

//     // Distributor login
//     if (req.user.role === "distributor") {
//       distributorId = req.user._id;
//     }

//     // SuperAdmin login
//     if (req.user.role === "superadmin") {
//       distributorId = req.query.distributorId;

//       if (!distributorId) {
//         return res.status(400).json({
//           message: "Distributor ID required",
//         });
//       }
//     }

//     const users = await User.find({
//       distributorId: distributorId,
//     });

//     return res.status(200).json({
//       count: users.length,
//       data: users,
//     });
//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({
//       error: error.message,
//     });
//   }
// };
