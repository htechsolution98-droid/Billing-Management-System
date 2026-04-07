import { createUsercontroller } from "../../controller/User/CreateUser.controller.js";
import { GetuserController } from "../../controller/User/GetUser.controller.js";

import express from "express";
const router = express.Router();

/**
 * @swagger
 * /api/distributor/create:
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

router.post("/create", createUsercontroller);

/**
 * @swagger
 * /api/distributor/get:
 *   get:
 *     summary: Get all distributors
 *     tags: [Distributor]
 *     responses:
 *       200:
 *         description: List of distributors fetched successfully
 */

router.get("/get", GetuserController);

export default router;
