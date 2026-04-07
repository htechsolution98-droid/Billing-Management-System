import upload from "../../config/multer.js";
import { createcontroller } from "../../controller/Distributor/CreateDistributor.controller.js";
import { GetDistributorController } from "../../controller/Distributor/GetDistributor.controller.js";

import express from "express";
const router = express.Router();

/**
 * @swagger
 * /api/distributorapi/create:
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

router.post("/create", upload.single("corpo_certino"), createcontroller);

/**
 * @swagger
 * /api/distributorapi/get:
 *   get:
 *     summary: Get all distributors
 *     tags: [Distributor]
 *     responses:
 *       200:
 *         description: List of distributors fetched successfully
 */

router.get("/get", GetDistributorController);

export default router;
