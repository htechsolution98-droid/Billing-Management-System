import protect from "../../middleware/auth.middleware.js";
import { authorizeRoles } from "../../middleware/role.middleware.js";
import { createproductcontroller } from "../../controllers/Product/product.controller.js";
import { getproductcontroller } from "../../controllers/Product/product.controller.js";
import { updateproductcontroller } from "../../controllers/Product/product.controller.js";
import { deleteproductcontroller } from "../../controllers/Product/product.controller.js";
import express from "express";
import { createUploader } from "../../Config/multer.js";
const uploadProducts = createUploader("products");
const router = express.Router();

// CREATE PRODUCT
router.post(
  "/create",
  protect,
  authorizeRoles("ShopUser"),
  uploadProducts.array("productImage", 8),
  createproductcontroller,
);
// GET PRODUCT
router.get("/get", protect, authorizeRoles("ShopUser"), getproductcontroller);

// UPDATE PRODUCT
router.put(
  "/update/:id",
  protect,
  authorizeRoles("ShopUser"),
  uploadProducts.array("productImage", 8),
  updateproductcontroller,
);

// DELETE PRODUCT
router.delete(
  "/delete/:id",
  protect,
  authorizeRoles("ShopUser"),
  deleteproductcontroller,
);

export default router;
