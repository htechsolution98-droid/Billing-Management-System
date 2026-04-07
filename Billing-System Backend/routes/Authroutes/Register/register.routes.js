import express from "express";

import { Registercontroller } from "../../../controller/Authcontroller/Registercontroller/register.controller.js";

import { GetRegistercontroller } from "../../../controller/Authcontroller/Registercontroller/getregister.controller.js";

// 🔐 Middleware import
import { verifyToken } from "../../../middlewares/authmiddlewares.js";
import { authorizeRoles } from "../../../middlewares/rolemiddleware.js";
import { createDistributorController } from "../../../controller/Authcontroller/Registercontroller/ditributor.controller.js";
import { createNUserController } from "../../../controller/Authcontroller/Registercontroller/nuser.controller.js";
import { dashboardController } from "../../../controller/Authcontroller/Registercontroller/dashboard.controller.js";
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

// PUBLIC ROUTE
router.post("/createregister", Registercontroller);

// 🔐 PROTECTED ROUTE ( superadmin)

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

router.get(
  "/getregister",
  verifyToken,
  authorizeRoles("superadmin"),
  GetRegistercontroller,
);

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

router.post(
  "/create-distributor",
  verifyToken,
  authorizeRoles("superadmin"),
  createDistributorController,
);

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

router.post(
  "/create-nuser",
  verifyToken,
  authorizeRoles("distributor"),
  createNUserController,
);

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

router.get(
  "/dashboard",
  verifyToken,
  authorizeRoles("superadmin", "distributor"),
  dashboardController,
);

export default router;
