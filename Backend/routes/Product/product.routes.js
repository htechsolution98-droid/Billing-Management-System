import protect from "../../middleware/auth.middleware.js";
import { authorizeRoles } from "../../middleware/role.middleware.js";
import { createproductcontroller } from "../../controllers/Product/product.controller.js";
import { createproductcontroller } from "../../controllers/Product/product.controller.js";
import { createproductcontroller } from "../../controllers/Product/product.controller.js";
import { deleteproductcontroller } from "../../controllers/Product/product.controller.js";
import express from "express";
const router = express.Router();

//SatatDist Crud API

router.post(
  "/create",
  protect,
  authorizeRoles("ShopUser"),
  createproductcontroller,
);
router.get(
  "/get",
  protect,
  authorizeRoles("ShopUser"),
  GetCategorycontroller,
);
router.put(
  "/update/:id",
  protect,
  authorizeRoles("ShopUser"),
  editCategoryController,
);
router.delete(
  "/delete/:id",
  protect,
  authorizeRoles("ShopUser"),
  deleteproductcontroller,
);

export default router;