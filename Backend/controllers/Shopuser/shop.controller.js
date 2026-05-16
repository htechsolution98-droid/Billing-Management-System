import { Shopcreateservice } from "../../services/Shopuser/shop.service.js";
import { GetShopservice } from "../../services/Shopuser/shop.service.js";
import { UpdateShopservice } from "../../services/Shopuser/shop.service.js";
import { DeleteShopservice } from "../../services/Shopuser/shop.service.js";
import User from "../../models/User.js";

export const ShopuserController = async (req, res) => {
  try {
    // 1. extract body here
    const { name, email, mobile, password } = req.body;
    // 2. uploaded file path
    let firmLogo = "";

    if (req.file) {
      firmLogo = req.file.path;
    }
    // 2. create user
    const user = await User.create({
      name,
      email,
      mobile,
      password,
      role: "ShopUser",
      createdBy: req.user._id,
    });
    // 3. create distributor
    const dist = await Shopcreateservice({
      ...req.body,
      userId: user._id,
      createdBy: req.user._id,
    });
    res.status(201).json({
      success: true,
      msg: "User Create Sucsesfully ",
      data: dist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "User Can't Be Create Sucsesfully ",
    });
    console.error(error);
  }
};

export const GetShopController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;

    const limit = parseInt(req.query.limit) || 10;

    const search = req.query.search || "";

    const data = await GetShopservice(
      req.user.role,
      req.user._id,
      page,
      limit,
      search,
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
export const updateShopcontroller = async (req, res, next) => {
  try {
    const { id } = req.params;

    const shop = await Shopuser.findById(id);

    if (!shop) {
      return res.status(404).json({
        message: "Shop not found",
      });
    }

    // STATE DISTRIBUTOR
    if (
      req.user.role === "STATE_DISTRIBUTOR" &&
      shop.stateDistributorId?.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    // DISTRICT DISTRIBUTOR
    if (
      req.user.role === "DISTRICT_DISTRIBUTOR" &&
      shop.districtDistributorId?.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const body = { ...req.body };

    const updateshopuser = await UpdateShopservice(id, body);

    res.status(200).json({
      message: "Shop user updated successfully",
      data: updateshopuser,
    });
  } catch (error) {
    next(error);
  }
};
// export const updateShopcontroller = async (req, res, next) => {
//   try {
//     if (req.user.role !== "SUPER_ADMIN") {
//       return res.status(403).json({
//         message: "Access denied",
//       });
//     }

//     const { id } = req.params;

//     const body = { ...req.body };

//     const updateshopuser = await UpdateShopservice(id, body);

//     res.status(200).json({
//       message: "Shopuser updated successfully",
//       data: updateshopuser,
//     });
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// };
export const DeleteShopcontroller = async (req, res, next) => {
  try {
    const { id } = req.params;

    const shop = await Shopuser.findById(id);

    if (!shop) {
      return res.status(404).json({
        message: "Shop not found",
      });
    }

    // STATE DISTRIBUTOR
    if (
      req.user.role === "STATE_DISTRIBUTOR" &&
      shop.stateDistributorId?.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    // DISTRICT DISTRIBUTOR
    if (
      req.user.role === "DISTRICT_DISTRIBUTOR" &&
      shop.districtDistributorId?.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const deleteshopuser = await DeleteShopservice(id);

    res.status(200).json({
      success: true,
      message: "Shop user deleted successfully",
      data: deleteshopuser,
    });
  } catch (error) {
    next(error);
  }
};
