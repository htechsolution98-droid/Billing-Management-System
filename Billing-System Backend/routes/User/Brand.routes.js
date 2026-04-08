import { CreateBrandController } from "../../controller/User/Brand/createbrand.controller.js";
import { GetBrandController } from "../../controller/User/Brand/getbrand.controller.js";

import express from "express";
const router = express.Router();
/**
 * @swagger
 * /api/brandapi/create:
 *   post:
 *     summary: Create brand
 
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
 *         description: brand created
 */

router.post("/create",CreateBrandController);
/**
 * @swagger
 * /api/brandapi/get:
 *   get:
 *     summary: Get all brand

 *     responses:
 *       200:
 *         description: List of brand fetched successfully
 */
router.get("/get", GetBrandController);

export default router;
