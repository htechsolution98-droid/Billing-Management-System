import { CreateBrandController } from "../../controller/User/Brand/createbrand.controller.js";
import { GetBrandController } from "../../controller/User/Brand/getbrand.controller.js";
import { GetBrandByCategoryController } from "../../controller/User/Brand/Getcategwisebrand.controller.js";
import { verifyToken } from "../../middlewares/authmiddlewares.js";
import { authorizeRoles } from "../../middlewares/rolemiddleware.js";
import { editBrandController } from "../../controller/User/Brand/editbrand.controller.js";
import { deleteBrandController } from "../../controller/User/Brand/deletbrand.controller.js";
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

router.post("/create", verifyToken, authorizeRoles("nuser"), CreateBrandController);

/**
 * @swagger
 * /api/barndapi/get:
 *   get:
 *     summary: Get all brand

 *     responses:
 *       200:
 *         description: List of brand fetched successfully
 */

router.get("/get", verifyToken, authorizeRoles("nuser"), GetBrandController);

/**
 * @swagger
 * /api/categorywisebarndgetapi/get:
 *   get:
 *     summary: Get all brand

 *     responses:
 *       200:
 *         description: List of brand fetched successfully
 */
router.get(
  "/brand/by-category/:categoryId",
  verifyToken,
  authorizeRoles("nuser"),
  GetBrandByCategoryController
);


router.put("/brandedit/:id", editBrandController);
router.delete("/branddelete/:id", deleteBrandController);
export default router;
