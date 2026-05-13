import protect from "../../middleware/auth.middleware.js";
import { authorizeRoles } from "../../middleware/role.middleware.js";
import { Createsubcategorycontroller } from "../../controllers/Subcategory/subcategory.controller.js";
import { Getsubcategorycontroller } from "../../controllers/Subcategory/subcategory.controller.js";
import { Updatesubcategorycontroller } from "../../controllers/Subcategory/subcategory.controller.js";
import { Deletesubcategorycontroller } from "../../controllers/Subcategory/subcategory.controller.js";
import express from "express";
const router = express.Router();

//SatatDist Crud API

router.post(
  "/create",
  protect,
  authorizeRoles("ShopUser"),
  Createsubcategorycontroller,
);
router.get(
  "/get",
  protect,
  authorizeRoles("ShopUser"),
  Getsubcategorycontroller,
);
router.put(
  "/update/:id",
  protect,
  authorizeRoles("ShopUser"),
  Updatesubcategorycontroller,
);
router.delete(
  "/delete/:id",
  protect,
  authorizeRoles("ShopUser"),
  Deletesubcategorycontroller,
);

export default router;