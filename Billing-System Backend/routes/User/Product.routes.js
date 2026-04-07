import upload from "../../config/multer.js";
import { createProductcontroller } from "../../controller/User/Products/Createproduct.controller.js";
import { GetProductController } from "../../controller/User/Products/Getproducts.controller.js";

import express from "express";
const router = express.Router();

/**
 * @swagger
 * /api/product/create:
 *   post:
 *     summary: Create Distributor
 *     tags: [Distributor]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               corpo_certino:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Distributor created
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
 * /api/product/get:
 *   get:
 *     summary: Get all distributors
 *     tags: [Distributor]
 *     responses:
 *       200:
 *         description: List of distributors fetched successfully
 */

router.get("/get", GetProductController);

export default router;
