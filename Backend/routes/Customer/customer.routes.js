import { customerRegisterController } from "../../controllers/Customer/customer.controller";
import { getProductsByShopCode } from "../../controllers/Customer/customer.controller";
import express from "express";
const router = express.Router();

router.post("/customer-register", customerRegisterController);
router.get("/shop-products/:shopCode", getProductsByShopCode);

export default router;
