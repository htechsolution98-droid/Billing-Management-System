import protect from "../../middleware/auth.middleware.js";
import { authorizeRoles } from "../../middleware/role.middleware.js";
import { CreateCategorycontroller } from "../../controllers/Category/category.controller.js";
import { GetCategorycontroller } from "../../controllers/Category/category.controller.js";
import { editCategoryController } from "../../controllers/Category/category.controller.js";
import { deleteCategoryController } from "../../controllers/Category/category.controller.js";
import express from "express";
const router = express.Router();

//SatatDist Crud API

router.post(
  "/create",
  protect,
  authorizeRoles("ShopUser"),
  CreateCategorycontroller,
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
  deleteCategoryController,
);

export default router;