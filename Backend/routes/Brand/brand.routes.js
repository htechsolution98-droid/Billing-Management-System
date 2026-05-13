import protect from "../../middleware/auth.middleware.js";
import { authorizeRoles } from "../../middleware/role.middleware.js";
import { CreateBrandController } from "../../controllers/Brand/brand.controller.js";
import { GetBrandController } from "../../controllers/Brand/brand.controller.js";
import { editBrandController } from "../../controllers/Brand/brand.controller.js";
import { deleteBrandController } from "../../controllers/Brand/brand.controller.js";

import express from "express";
const router = express.Router();

//Barnd Crud API

router.post(
  "/create",
  protect,
  authorizeRoles("ShopUser"),
  CreateBrandController,
);
router.get(
  "/get",
  protect,
  authorizeRoles("ShopUser"),
  GetBrandController,
);
router.put(
  "/update/:id",
  protect,
  authorizeRoles("ShopUser"),
  editBrandController,
);
router.delete(
  "/delete/:id",
  protect,
  authorizeRoles("ShopUser"),
  deleteBrandController,
);

export default router;