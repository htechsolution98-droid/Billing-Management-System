import { CreateCategoryController } from "../../controller/User/Category/createcategory.controller.js";
import { GetCategoryController } from "../../controller/User/Category/getcategory.controller.js";
import { verifyToken } from "../../middlewares/authmiddlewares.js";
import { authorizeRoles } from "../../middlewares/rolemiddleware.js";

import express from "express";
const router = express.Router();
/**
 * @swagger
 * /api/Categoryapi/create:
 *   post:
 *     summary: Create Category
 
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               productImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Category created
 */

router.post("/create", verifyToken, authorizeRoles("nuser"), CreateCategoryController);
/**
 * @swagger
 * /api/cetegoryapi/get:
 *   get:
 *     summary: Get all categories
 *     responses:
 *       200:
 *         description: Category list
 */
router.get("/get", GetCategoryController);

export default router;
