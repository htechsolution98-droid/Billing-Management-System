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

      const users = await User.find(query).populate("distributorId", "name distributorCode");

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
