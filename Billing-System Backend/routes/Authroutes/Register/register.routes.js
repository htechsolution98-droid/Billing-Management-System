import express from "express";
import { createregisterController } from "../../../controller/Authcontroller/Registercontroller/register.controller.js";
import { GetRegistercontroller } from "../../../controller/Authcontroller/Registercontroller/getregister.controller.js";
// 🔐 Middleware import
import { verifyToken } from "../../../middlewares/authmiddlewares.js";
import { authorizeRoles } from "../../../middlewares/rolemiddleware.js";
// import { createDistributorController } from "../../../controller/Authcontroller/Registercontroller/ditributor.controller.js";
// import { createNUserController } from "../../../controller/Authcontroller/Registercontroller/nuser.controller.js";
// import { dashboardController } from "../../../controller/Authcontroller/Registercontroller/dashboard.controller.js";
const router = express.Router();

// PUBLIC (self signup)
/**
 * @swagger
 * /api/register/createregister:
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

router.post("/createregister", createregisterController);

// Superadmin creates Distributor
/**
 * @swagger
 * /api/register/dist-create:
 *   post:
 *     summary: dist-create
 
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
  "/dist-create",
  verifyToken,
  authorizeRoles("superadmin"),
  createregisterController,
);

// Distributor or superadmin creates NUser
/**
 * @swagger
 * /api/register/nuser-create:
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
 *         description: nuser created
 */

router.post(
  "/nuser-create",
  verifyToken,
  authorizeRoles("superadmin", "distributor"),
  createregisterController,
);

// ✅ Get All Users (SuperAdmin only)
/**
 * @swagger
 * /api/register/getregister:
 *   get:
 *     summary: Get all distributors

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

// ✅ Dashboard (SuperAdmin + Distributor)

/**
 * @swagger
 * /api/register/dashboard:
 *   get:
 *     summary: Get all distributors

 *     responses:
 *       200:
 *         description: List of distributors fetched successfully
 */

// router.get(
//   "/dashboard",
//   verifyToken,
//   authorizeRoles("superadmin", "distributor"),
//   dashboardController,
// );

export default router;

// 🔐 PROTECTED ROUTE ( superadmin)
/**
* @swagger
 * /api/register/create:
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

// ✅ Create Distributor (SuperAdmin only)

// router.post(
//   "/create-distributor",
//   verifyToken,
//   authorizeRoles("superadmin"),
//   createDistributorController
// );

/**
* @swagger
 * /api/register/create-nuser:
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

// ✅ Create NUser (Distributor only)

// router.post(
//   "/create-nuser",
//   verifyToken,
//   authorizeRoles("superadmin","distributor"),
//   createNUserController
// );
