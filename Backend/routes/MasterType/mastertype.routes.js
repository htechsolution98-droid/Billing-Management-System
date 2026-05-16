import protect from "../../middleware/auth.middleware.js";
import { authorizeRoles } from "../../middleware/role.middleware.js";
import { CreatemasterController } from "../../controllers/MasterType/mastertype.controller.js";
import { GetmasterController } from "../../controllers/MasterType/mastertype.controller.js";
import { updatemastercontroller } from "../../controllers/MasterType/mastertype.controller.js";
import { Deletemastercontroller } from "../../controllers/MasterType/mastertype.controller.js";
import express from "express";
const router = express.Router();

// Crud API

/**
 * @swagger
 * /api/masteritem/create:
 *   post:
 *     summary: Create master item
 *     description: Creates a new master item/type. Accessible to super admin users only.
 *     tags:
 *       - Master Type
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Product Unit
 *               value:
 *                 type: string
 *                 example: kg
 *               status:
 *                 type: string
 *                 example: active
 *     responses:
 *       200:
 *         description: Master item created successfully.
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
  authorizeRoles("SUPER_ADMIN"),
  CreatemasterController,
);
/**
 * @swagger
 * /api/masteritem/get:
 *   get:
 *     summary: Get master items
 *     description: Returns master items/types for super admin users.
 *     tags:
 *       - Master Type
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
 *     responses:
 *       200:
 *         description: Master items fetched successfully.
 *       400:
 *         description: Invalid request.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: Master items not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/get", protect, authorizeRoles("SUPER_ADMIN"), GetmasterController);
/**
 * @swagger
 * /api/masteritem/update/{id}:
 *   put:
 *     summary: Update master item
 *     description: Updates an existing master item/type by ID.
 *     tags:
 *       - Master Type
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Master item ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Product Unit
 *               value:
 *                 type: string
 *                 example: kg
 *               status:
 *                 type: string
 *                 example: active
 *     responses:
 *       200:
 *         description: Master item updated successfully.
 *       400:
 *         description: Invalid request data.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: Master item not found.
 *       500:
 *         description: Internal server error.
 */
router.put(
  "/update/:id",
  protect,
  authorizeRoles("SUPER_ADMIN"),
  updatemastercontroller,
);
/**
 * @swagger
 * /api/masteritem/delete/{id}:
 *   delete:
 *     summary: Delete master item
 *     description: Deletes an existing master item/type by ID.
 *     tags:
 *       - Master Type
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Master item ID.
 *     responses:
 *       200:
 *         description: Master item deleted successfully.
 *       400:
 *         description: Invalid request.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: Master item not found.
 *       500:
 *         description: Internal server error.
 */
router.delete(
  "/delete/:id",
  protect,
  authorizeRoles("SUPER_ADMIN"),
  Deletemastercontroller,
);

export default router;
