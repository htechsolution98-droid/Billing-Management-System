import upload from "../../config/multer.js";
import multer from "multer";

import { createProductcontroller } from "../../controller/User/Products/Createproduct.controller.js";
import { GetProductController } from "../../controller/User/Products/Getproducts.controller.js";

import express from "express";
const router = express.Router();
/**
 * @swagger
 * /api/productapi/create:
 *   post:
 *     summary: Create product
 *     tags: [product]
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
  (req, res, next) => {
    upload.single("productImage")(req, res, function (err) {
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
 *     tags: [product]
 *     responses:
 *       200:
 *         description: List of product fetched successfully
 */
router.get("/get", GetProductController);

export default router;
