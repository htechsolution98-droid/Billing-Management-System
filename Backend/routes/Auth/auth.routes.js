import {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
} from "../../controllers/Auth/auth.controller.js";

import protect from "../../middleware/auth.middleware.js";

import express from "express";
const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new platform user account and returns the created user details.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: Rohan Kumar
 *               email:
 *                 type: string
 *                 format: email
 *                 example: rohan@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: StrongPass123
 *               mobile:
 *                 type: string
 *                 example: "9876543210"
 *               role:
 *                 type: string
 *                 example: ShopUser
 *     responses:
 *       200:
 *         description: User registered successfully.
 *       400:
 *         description: Invalid request data or user already exists.
 *       401:
 *         description: Unauthorized request.
 *       404:
 *         description: Requested resource was not found.
 *       500:
 *         description: Internal server error.
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     description: Authenticates a user with email and password and returns an access token.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: rohan@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: StrongPass123
 *     responses:
 *       200:
 *         description: Login successful.
 *       400:
 *         description: Invalid request data.
 *       401:
 *         description: Invalid credentials.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Get authenticated user profile
 *     description: Returns the profile details for the currently authenticated user.
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile fetched successfully.
 *       400:
 *         description: Invalid request.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: User profile not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/profile", protect, getProfile);

/**
 * @swagger
 * /api/auth/logout:
 *   get:
 *     summary: Logout authenticated user
 *     description: Logs out the currently authenticated user session.
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful.
 *       400:
 *         description: Invalid request.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: User session not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/logout", protect, logoutUser);

export default router;
