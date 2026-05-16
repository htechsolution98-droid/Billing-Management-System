import protect from "../../middleware/auth.middleware.js";
import { authorizeRoles } from "../../middleware/role.middleware.js";
import { CreateCategorycontroller } from "../../controllers/Category/category.controller.js";
import { GetCategorycontroller } from "../../controllers/Category/category.controller.js";
import { editCategoryController } from "../../controllers/Category/category.controller.js";
import { deleteCategoryController } from "../../controllers/Category/category.controller.js";
import express from "express";
const router = express.Router();

//SatatDist Crud API

/**
 * @swagger
 * /api/category/create:
 *   post:
 *     summary: Create category
 *     description: Creates a new product category for the authenticated shop user.
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categoryName
 *             properties:
 *               categoryName:
 *                 type: string
 *                 example: Beverages
 *     responses:
 *       200:
 *         description: Category created successfully.
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
  CreateCategorycontroller,
);
/**
 * @swagger
 * /api/category/get:
 *   get:
 *     summary: Get categories
 *     description: Returns product categories available to the authenticated shop user.
 *     tags:
 *       - Category
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
 *           example: beverage
 *         description: Optional category name search text.
 *     responses:
 *       200:
 *         description: Categories fetched successfully.
 *       400:
 *         description: Invalid request.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: Categories not found.
 *       500:
 *         description: Internal server error.
 */
router.get(
  "/get",
  protect,
  authorizeRoles("ShopUser"),
  GetCategorycontroller,
);
/**
 * @swagger
 * /api/category/update/{id}:
 *   put:
 *     summary: Update category
 *     description: Updates an existing product category by ID.
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *                 example: Beverages
 *     responses:
 *       200:
 *         description: Category updated successfully.
 *       400:
 *         description: Invalid request data.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Internal server error.
 */
router.put(
  "/update/:id",
  protect,
  authorizeRoles("ShopUser"),
  editCategoryController,
);
/**
 * @swagger
 * /api/category/delete/{id}:
 *   delete:
 *     summary: Delete category
 *     description: Deletes an existing product category by ID.
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID.
 *     responses:
 *       200:
 *         description: Category deleted successfully.
 *       400:
 *         description: Invalid request.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Internal server error.
 */
router.delete(
  "/delete/:id",
  protect,
  authorizeRoles("ShopUser"),
  deleteCategoryController,
);

export default router;
