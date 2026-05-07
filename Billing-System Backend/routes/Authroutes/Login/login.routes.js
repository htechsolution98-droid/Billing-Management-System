import { logincontroller } from "../../../controller/Authcontroller/Logincontroller/createlogin.controller.js";
import express from "express";
const router = express.Router();

/**
 * @swagger
 * /api/loginapi/login:
 *   post:
 *     summary: User Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */

router.post("/login", logincontroller);

export default router;
