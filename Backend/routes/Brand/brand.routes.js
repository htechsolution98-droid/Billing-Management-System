import protect from "../../middleware/auth.middleware.js";
import { authorizeRoles } from "../../middleware/role.middleware.js";
import { CreateBrandController } from "../../controllers/Brand/brand.controller.js";
import { GetBrandController } from "../../controllers/Brand/brand.controller.js";
import { editBrandController } from "../../controllers/Brand/brand.controller.js";
import { deleteBrandController } from "../../controllers/Brand/brand.controller.js";

import express from "express";
const router = express.Router();

//Barnd Crud API

/**
 * @swagger
 * /api/barnd/create:
 *   post:
 *     summary: Create brand
 *     description: Creates a new brand for the authenticated shop user.
 *     tags:
 *       - Brand
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - brandName
 *             properties:
 *               brandName:
 *                 type: string
 *                 example: Coca Cola
 *     responses:
 *       200:
 *         description: Brand created successfully.
 *       400:
 *         description: Invalid request data.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: Related resource not found.
 *       500:
 *         description: Internal server error.
 */
router.post(
  "/create",
  protect,
  authorizeRoles("ShopUser"),
  CreateBrandController,
);
/**
 * @swagger
 * /api/barnd/get:
 *   get:
 *     summary: Get brands
 *     description: Returns brands available to the authenticated shop user.
 *     tags:
 *       - Brand
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
 *         description: Optional brand name search text.
 *     responses:
 *       200:
 *         description: Brands fetched successfully.
 *       400:
 *         description: Invalid request.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: Brands not found.
 *       500:
 *         description: Internal server error.
 */
router.get(
  "/get",
  protect,
  authorizeRoles("ShopUser"),
  GetBrandController,
);
/**
 * @swagger
 * /api/barnd/update/{id}:
 *   put:
 *     summary: Update brand
 *     description: Updates an existing brand by ID for the authenticated shop user.
 *     tags:
 *       - Brand
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Brand ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brandName:
 *                 type: string
 *                 example: Coca Cola
 *     responses:
 *       200:
 *         description: Brand updated successfully.
 *       400:
 *         description: Invalid request data.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: Brand not found.
 *       500:
 *         description: Internal server error.
 */
router.put(
  "/update/:id",
  protect,
  authorizeRoles("ShopUser"),
  editBrandController,
);
/**
 * @swagger
 * /api/barnd/delete/{id}:
 *   delete:
 *     summary: Delete brand
 *     description: Deletes an existing brand by ID for the authenticated shop user.
 *     tags:
 *       - Brand
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Brand ID.
 *     responses:
 *       200:
 *         description: Brand deleted successfully.
 *       400:
 *         description: Invalid request.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: Brand not found.
 *       500:
 *         description: Internal server error.
 */
router.delete(
  "/delete/:id",
  protect,
  authorizeRoles("ShopUser"),
  deleteBrandController,
);

export default router;
