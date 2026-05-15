import { customerRegisterController } from "../../controllers/Customer/customer.controller";
import { getProductsByShopCode } from "../../controllers/Customer/customer.controller";
import express from "express";
const router = express.Router();
import { createUploader } from "../../Config/multer.js";
const uploadProducts = createUploader("users");

router.post(
  "/customer-register",
  uploadProducts.single("profileImage"),
  customerRegisterController,
);
router.get("/shop-products/:shopCode", getProductsByShopCode);

export default router;
