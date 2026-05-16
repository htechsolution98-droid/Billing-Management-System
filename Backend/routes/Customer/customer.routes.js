import { customerRegisterController } from "../../controllers/Customer/customer.controller.js";
import { getProductsByShopCode } from "../../controllers/Customer/customer.controller.js";
import express from "express";
const router = express.Router();
import { createUploader } from "../../Config/multer.js";
const uploadProducts = createUploader("users");

/**
 * @swagger
 * /api/customer/customer-register:
 *   post:
 *     summary: Register customer
 *     description: Creates a new customer account with optional profile image upload.
 *     tags:
 *       - Customer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - customerName
 *               - mobile
 *               - email
 *               - password
 *             properties:
 *               customerName:
 *                 type: string
 *                 example: Ankit Sharma
 *               mobile:
 *                 type: string
 *                 example: "9876543210"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: ankit@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: StrongPass123
 *               address:
 *                 type: string
 *                 example: 21 Market Road
 *               state:
 *                 type: string
 *                 example: Uttar Pradesh
 *               district:
 *                 type: string
 *                 example: Lucknow
 *               area:
 *                 type: string
 *                 example: Hazratganj
 *               pincode:
 *                 type: string
 *                 example: "226001"
 *               profileImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Customer registered successfully.
 *       400:
 *         description: Invalid request data or customer already exists.
 *       401:
 *         description: Unauthorized request.
 *       404:
 *         description: Related resource not found.
 *       500:
 *         description: Internal server error.
 */
router.post(
  "/customer-register",
  uploadProducts.single("profileImage"),
  customerRegisterController,
);
/**
 * @swagger
 * /api/customer/shop-products/{shopCode}:
 *   get:
 *     summary: Get products by shop code
 *     description: Returns active products for a shop using its public shop code.
 *     tags:
 *       - Customer
 *     parameters:
 *       - in: path
 *         name: shopCode
 *         required: true
 *         schema:
 *           type: string
 *         description: Public shop code.
 *         example: SHOPUSER0001
 *     responses:
 *       200:
 *         description: Products fetched successfully.
 *       400:
 *         description: Invalid shop code.
 *       401:
 *         description: Unauthorized request.
 *       404:
 *         description: Shop not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/shop-products/:shopCode", getProductsByShopCode);

export default router;
