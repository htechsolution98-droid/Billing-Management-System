import { ShopuserController } from "../../controllers/Shopuser/shop.controller.js";
import { GetShopController } from "../../controllers/Shopuser/shop.controller.js";
import { updateShopcontroller } from "../../controllers/Shopuser/shop.controller.js";
import { DeleteShopcontroller } from "../../controllers/Shopuser/shop.controller.js";
import protect from "../../middleware/auth.middleware.js";
import { authorizeRoles } from "../../middleware/role.middleware.js";
import express from "express";
const router = express.Router();

//SatatDist Crud API

router.post(
  "/create",
  protect,
  authorizeRoles("SUPER_ADMIN", "STATE_DISTRIBUTOR", "DISTRICT_DISTRIBUTOR"),
  ShopuserController,
);
router.get(
  "/get",
  protect,
  authorizeRoles("SUPER_ADMIN", "STATE_DISTRIBUTOR", "DISTRICT_DISTRIBUTOR"),
  GetShopController,
);
router.put(
  "/update/:id",
  protect,
  authorizeRoles("SUPER_ADMIN", "STATE_DISTRIBUTOR", "DISTRICT_DISTRIBUTOR"),
  updateShopcontroller,
);
router.delete(
  "/delete/:id",
  protect,
  authorizeRoles("SUPER_ADMIN", "STATE_DISTRIBUTOR", "DISTRICT_DISTRIBUTOR"),
  DeleteShopcontroller,
);

export default router;
