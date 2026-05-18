import protect from "../../middleware/auth.middleware.js";
import { authorizeRoles } from "../../middleware/role.middleware.js";
import { CreateshoptypeController } from "../../controllers/shopType/shoptype.controller.js";
import { GetshoptypeController } from "../../controllers/shopType/shoptype.controller.js";
import { updateshoptypecontroller } from "../../controllers/shopType/shoptype.controller.js";
import { Deleteshoptypecontroller } from "../../controllers/shopType/shoptype.controller.js";
import express from "express";
const router = express.Router();

// Crud API

/**
 * @swagger
 * /api/shoptype/create:
 *   post:
 *     summary: Create shoptype item
 *     description: Creates a new shoptype item/type. Accessible to super admin users only.
 *     tags:
 *       - shoptype Type
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
 *         description: shoptype item created successfully.
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
  CreateshoptypeController,
);
/**
 * @swagger
 * /api/shoptype/get:
 *   get:
 *     summary: Get shoptype items
 *     description: Returns shoptype items/types for super admin users.
 *     tags:
 *       - shoptype Type
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
 *         description: shoptype items fetched successfully.
 *       400:
 *         description: Invalid request.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: shoptype items not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/get", protect, authorizeRoles("SUPER_ADMIN"), GetshoptypeController);
/**
 * @swagger
 * /api/shoptype/update/{id}:
 *   put:
 *     summary: Update shoptype item
 *     description: Updates an existing shoptype item/type by ID.
 *     tags:
 *       - shoptype Type
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: shoptype item ID.
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
 *         description: shoptype item updated successfully.
 *       400:
 *         description: Invalid request data.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: shoptype item not found.
 *       500:
 *         description: Internal server error.
 */
router.put(
  "/update/:id",
  protect,
  authorizeRoles("SUPER_ADMIN"),
  updateshoptypecontroller,
);
/**
 * @swagger
 * /api/shoptype/delete/{id}:
 *   delete:
 *     summary: Delete shoptype item
 *     description: Deletes an existing shoptype item/type by ID.
 *     tags:
 *       - shoptype Type
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: shoptype item ID.
 *     responses:
 *       200:
 *         description: shoptype item deleted successfully.
 *       400:
 *         description: Invalid request.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: shoptype item not found.
 *       500:
 *         description: Internal server error.
 */
router.delete(
  "/delete/:id",
  protect,
  authorizeRoles("SUPER_ADMIN"),
  Deleteshoptypecontroller,
);

export default router;
