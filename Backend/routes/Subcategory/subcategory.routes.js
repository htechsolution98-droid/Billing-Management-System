import protect from "../../middleware/auth.middleware.js";
import { authorizeRoles } from "../../middleware/role.middleware.js";
import { Createsubcategorycontroller } from "../../controllers/Subcategory/subcategory.controller.js";
import { Getsubcategorycontroller } from "../../controllers/Subcategory/subcategory.controller.js";
import { Updatesubcategorycontroller } from "../../controllers/Subcategory/subcategory.controller.js";
import { Deletesubcategorycontroller } from "../../controllers/Subcategory/subcategory.controller.js";
import express from "express";
const router = express.Router();

//SatatDist Crud API

/**
 * @swagger
 * /api/subcategory/create:
 *   post:
 *     summary: Create subcategory
 *     description: Creates a new product subcategory under a category.
 *     tags:
 *       - Subcategory
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subCategoryName
 *               - categoryId
 *             properties:
 *               subCategoryName:
 *                 type: string
 *                 example: Soft Drinks
 *               categoryId:
 *                 type: string
 *                 example: 663f1e6c8a9f2b0012abcd34
 *     responses:
 *       200:
 *         description: Subcategory created successfully.
 *       400:
 *         description: Invalid request data.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Internal server error.
 */
router.post(
  "/create",
  protect,
  authorizeRoles("ShopUser"),
  Createsubcategorycontroller,
);
/**
 * @swagger
 * /api/subcategory/get:
 *   get:
 *     summary: Get subcategories
 *     description: Returns product subcategories available to the authenticated shop user.
 *     tags:
 *       - Subcategory
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
 *           example: soft
 *         description: Optional subcategory name search text.
 *     responses:
 *       200:
 *         description: Subcategories fetched successfully.
 *       400:
 *         description: Invalid request.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: Subcategories not found.
 *       500:
 *         description: Internal server error.
 */
router.get(
  "/get",
  protect,
  authorizeRoles("ShopUser"),
  Getsubcategorycontroller,
);
/**
 * @swagger
 * /api/subcategory/update/{id}:
 *   put:
 *     summary: Update subcategory
 *     description: Updates an existing product subcategory by ID.
 *     tags:
 *       - Subcategory
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subcategory ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subCategoryName:
 *                 type: string
 *                 example: Soft Drinks
 *               categoryId:
 *                 type: string
 *                 example: 663f1e6c8a9f2b0012abcd34
 *     responses:
 *       200:
 *         description: Subcategory updated successfully.
 *       400:
 *         description: Invalid request data.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: Subcategory not found.
 *       500:
 *         description: Internal server error.
 */
router.put(
  "/update/:id",
  protect,
  authorizeRoles("ShopUser"),
  Updatesubcategorycontroller,
);
/**
 * @swagger
 * /api/subcategory/delete/{id}:
 *   delete:
 *     summary: Delete subcategory
 *     description: Deletes an existing product subcategory by ID.
 *     tags:
 *       - Subcategory
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subcategory ID.
 *     responses:
 *       200:
 *         description: Subcategory deleted successfully.
 *       400:
 *         description: Invalid request.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: Subcategory not found.
 *       500:
 *         description: Internal server error.
 */
router.delete(
  "/delete/:id",
  protect,
  authorizeRoles("ShopUser"),
  Deletesubcategorycontroller,
);

export default router;
