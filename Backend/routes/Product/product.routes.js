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
/**
 * @swagger
 * /api/product/create:
 *   post:
 *     summary: Create product
 *     description: Creates a product for the authenticated shop user with optional product images and variants.
 *     tags:
 *       - Product
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - productName
 *               - productDescription
 *             properties:
 *               productName:
 *                 type: string
 *                 example: Coca Cola 1L
 *               productImage:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Up to 8 product images.
 *               productDescription:
 *                 type: string
 *                 example: Cold drink bottle
 *               productUnit:
 *                 type: string
 *                 enum: [kg, gm, liter, ml, piece, cm]
 *                 example: liter
 *               categoryId:
 *                 type: string
 *                 example: 663f1e6c8a9f2b0012abcd34
 *               subCategoryId:
 *                 type: string
 *                 example: 663f1e6c8a9f2b0012abcd35
 *               brandId:
 *                 type: string
 *                 example: 663f1e6c8a9f2b0012abcd36
 *               variants:
 *                 type: string
 *                 description: JSON string or form field containing size and pricing variants.
 *                 example: '[{"sizeName":"1 Liter","price":100,"discountPrice":90,"stock":50}]'
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *                 example: active
 *     responses:
 *       200:
 *         description: Product created successfully.
 *       400:
 *         description: Invalid request data.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: Shop or related resource not found.
 *       500:
 *         description: Internal server error.
 */
router.post(
  "/create",
  protect,
  authorizeRoles("ShopUser"),
  uploadProducts.array("productImage", 8),
  createproductcontroller,
);
// GET PRODUCT
/**
 * @swagger
 * /api/product/get:
 *   get:
 *     summary: Get products
 *     description: Returns paginated products for the authenticated shop user.
 *     tags:
 *       - Product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of records per page.
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: cola
 *         description: Optional product name search text.
 *     responses:
 *       200:
 *         description: Products fetched successfully.
 *       400:
 *         description: Invalid request.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: Shop or products not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/get", protect, authorizeRoles("ShopUser"), getproductcontroller);

// UPDATE PRODUCT
/**
 * @swagger
 * /api/product/update/{id}:
 *   put:
 *     summary: Update product
 *     description: Updates an existing product owned by the authenticated shop user.
 *     tags:
 *       - Product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *                 example: Coca Cola 2L
 *               productImage:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Up to 8 replacement product images.
 *               productDescription:
 *                 type: string
 *                 example: Cold drink bottle
 *               productUnit:
 *                 type: string
 *                 enum: [kg, gm, liter, ml, piece, cm]
 *                 example: liter
 *               categoryId:
 *                 type: string
 *               subCategoryId:
 *                 type: string
 *               brandId:
 *                 type: string
 *               variants:
 *                 type: string
 *                 description: JSON string containing size and pricing variants.
 *                 example: '[{"sizeName":"2 Liter","price":180,"discountPrice":160,"stock":30}]'
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *                 example: active
 *     responses:
 *       200:
 *         description: Product updated successfully.
 *       400:
 *         description: Invalid request data.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: Product not found or unauthorized.
 *       500:
 *         description: Internal server error.
 */
router.put(
  "/update/:id",
  protect,
  authorizeRoles("ShopUser"),
  uploadProducts.array("productImage", 8),
  updateproductcontroller,
);

// DELETE PRODUCT
/**
 * @swagger
 * /api/product/delete/{id}:
 *   delete:
 *     summary: Delete product
 *     description: Deletes an existing product owned by the authenticated shop user.
 *     tags:
 *       - Product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID.
 *     responses:
 *       200:
 *         description: Product deleted successfully.
 *       400:
 *         description: Invalid request.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: Product not found or unauthorized.
 *       500:
 *         description: Internal server error.
 */
router.delete(
  "/delete/:id",
  protect,
  authorizeRoles("ShopUser"),
  deleteproductcontroller,
);

export default router;
