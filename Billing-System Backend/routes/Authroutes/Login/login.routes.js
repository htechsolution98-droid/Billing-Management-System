import { logincontroller } from "../../../controller/Authcontroller/Logincontroller/createlogin.controller.js";
import express from "express";
const router = express.Router();

/**
 * @swagger
 * /api/loginapi/login:
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

router.post("/login", logincontroller);

export default router;
