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


// PUBLIC (self signup)
router.post(
  "/createregister",
  createregisterController
);


/**
 * @swagger
 * /api/register/admin-create:
 *   post:
 *     summary: admin-create
 
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

// Superadmin creates Distributor
router.post(
  "/dist-create",
  verifyToken,
  authorizeRoles("superadmin"),
  createregisterController
);


/**
 * @swagger
 * /api/register/dist-create:
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

// Distributor creates NUser
router.post(
  "/nuser-create",
  verifyToken,
  authorizeRoles("superadmin","distributor"),
  createregisterController
);

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
/**
 * @swagger
 * /api/register/dashboard:
 *   get:
 *     summary: Get all distributors

 *     responses:
 *       200:
 *         description: List of distributors fetched successfully
 */



/**
  * @swagger
 * /api/register/getregister:
 *   get:
 *     summary: Get all distributors

 *     responses:
 *       200:
 *         description: List of distributors fetched successfully
 */


// ✅ Get All Users (SuperAdmin only)

router.get(
  "/getregister",
  verifyToken,
  authorizeRoles("superadmin"),
  GetRegistercontroller
);


// ✅ Dashboard (SuperAdmin + Distributor)

// router.get(
//   "/dashboard",
//   verifyToken,
//   authorizeRoles("superadmin", "distributor"),
//   dashboardController
// );

export default router;
