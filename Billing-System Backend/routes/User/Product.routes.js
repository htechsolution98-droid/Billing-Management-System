import upload from "../../config/multer.js";
import multer from "multer";

import { createProductcontroller } from "../../controller/User/Products/Createproduct.controller.js";
import { GetProductController } from "../../controller/User/Products/Getproducts.controller.js";
import { verifyToken } from "../../middlewares/authmiddlewares.js";
import { authorizeRoles } from "../../middlewares/rolemiddleware.js";
import { deleteproductcontroller } from "../../controller/User/Products/productdelete.controller.js";
import { updateNusercontroller } from "../../controller/User/Products/productedit.controller.js";
import express from "express";
const router = express.Router();
/**
 * @swagger
 * /api/productapi/create:
 *   post:
 *     summary: Create product
 
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
 *         description: product created
 */

router.post(
  "/create",
  verifyToken,
  authorizeRoles("nuser"),
  (req, res, next) => {
    upload.array("productImage")(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({
          msg: "File too large. Max 2MB allowed",
        });
      }

      if (err) {
        return res.status(400).json({
          msg: err.message,
        });
      }

      next();
    });
  },
  createProductcontroller,
);
/**
 * @swagger
 * /api/productapi/get:
 *   get:
 *     summary: Get all product

 *     responses:
 *       200:
 *         description: List of product fetched successfully
 */
router.get("/get", verifyToken, authorizeRoles("nuser"), GetProductController);


//******************************************update and delete api
router.put(
  "/product/update/:id",
  verifyToken,
  authorizeRoles("nuser"),
  (req, res, next) => {
    upload.array("productImage")(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({
          msg: "File too large. Max 2MB allowed",
        });
      }
      if (err) {
        return res.status(400).json({
          msg: err.message,
        });
      }
      next();
    });
  },
  updateNusercontroller,
);

router.delete(
  "/product/delete/:id",
  verifyToken,
  authorizeRoles("nuser"),
  deleteproductcontroller,
);
export default router;
