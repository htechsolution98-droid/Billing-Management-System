import upload from "../../config/multer.js";
import multer from "multer";
import { createUsercontroller } from "../../controller/User/CreateUser.controller.js";
import { GetuserController } from "../../controller/User/GetUser.controller.js";

import express from "express";
const router = express.Router();
import { verifyToken } from "../../middlewares/authmiddlewares.js";
import { authorizeRoles } from "../../middlewares/rolemiddleware.js";
/**
 * @swagger
 * /api/nuserapi/create:
 *   post:
 *     summary: Create Distributor
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
  verifyToken,
  authorizeRoles("distributor"),
  (req, res, next) => {
    upload.single("firmLogo")(req, res, function (err) {
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
  createUsercontroller,
);

/**
 * @swagger
 * /api/nuserapi/get:
 *   get:
 *     summary: Get all distributors
 *     responses:
 *       200:
 *         description: List of distributors fetched successfully
 */

router.get("/get", GetuserController);

export default router;
