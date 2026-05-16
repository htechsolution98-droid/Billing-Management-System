import {
  CreateDistController,
  Deletestatedistcontroller,
  updatestatedistcontroller,
  GetstatedistController,
} from "../../controllers/StateDist/statedist.controller.js";
import { getstateDistProfileController } from "../../controllers/StateDist/stateprofile.controller.js";
import { updatestateDistProfileController } from "../../controllers/StateDist/stateprofile.controller.js";
import { LatestDistdistributortget } from "../../controllers/StateDist/stateprofile.controller.js";
import protect from "../../middleware/auth.middleware.js";
import { authorizeRoles } from "../../middleware/role.middleware.js";
import { createUploader } from "../../Config/multer.js";
import { getStateDashboardController } from "../../controllers/StateDist/statedash.controller.js";
import { getShopsByDistrictController } from "../../controllers/StateDist/statedist.controller.js";
import { getDistrictByStateController } from "../../controllers/StateDist/statedist.controller.js";
const uploadProducts = createUploader("users");
import express from "express";
const router = express.Router();

//SatatDist Crud API

/**
 * @swagger
 * /api/stateDist/create:
 *   post:
 *     summary: Create state distributor
 *     description: Creates a state distributor account. Accessible to super admin users only.
 *     tags:
 *       - State Distributor
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firmName
 *               - contactPersonName
 *             properties:
 *               firmName:
 *                 type: string
 *               contactPersonName:
 *                 type: string
 *               state:
 *                 type: string
 *               district:
 *                 type: string
 *               area:
 *                 type: string
 *               address:
 *                 type: string
 *               pincode:
 *                 type: string
 *     responses:
 *       200:
 *         description: State distributor created successfully.
 *       400:
 *         description: Invalid request data.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: Related resource not found.
 *       500:
 *         description: Internal server error.
 */
router.post(
  "/create",
  protect,
  authorizeRoles("SUPER_ADMIN"),
  CreateDistController,
);

/**
 * @swagger
 * /api/stateDist/get:
 *   get:
 *     summary: Get state distributors
 *     description: Returns state distributor records for super admin users.
 *     tags:
 *       - State Distributor
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of records per page.
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Optional distributor search text.
 *     responses:
 *       200:
 *         description: State distributors fetched successfully.
 *       400:
 *         description: Invalid request.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: State distributors not found.
 *       500:
 *         description: Internal server error.
 */
router.get(
  "/get",
  protect,
  authorizeRoles("SUPER_ADMIN"),
  GetstatedistController,
);
/**
 * @swagger
 * /api/stateDist/update/{id}:
 *   put:
 *     summary: Update state distributor
 *     description: Updates an existing state distributor by ID.
 *     tags:
 *       - State Distributor
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: State distributor ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firmName:
 *                 type: string
 *               contactPersonName:
 *                 type: string
 *               state:
 *                 type: string
 *               district:
 *                 type: string
 *               area:
 *                 type: string
 *               address:
 *                 type: string
 *               pincode:
 *                 type: string
 *     responses:
 *       200:
 *         description: State distributor updated successfully.
 *       400:
 *         description: Invalid request data.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: State distributor not found.
 *       500:
 *         description: Internal server error.
 */
router.put(
  "/update/:id",
  protect,
  authorizeRoles("SUPER_ADMIN"),
  updatestatedistcontroller,
);
/**
 * @swagger
 * /api/stateDist/delete/{id}:
 *   delete:
 *     summary: Delete state distributor
 *     description: Deletes an existing state distributor by ID.
 *     tags:
 *       - State Distributor
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: State distributor ID.
 *     responses:
 *       200:
 *         description: State distributor deleted successfully.
 *       400:
 *         description: Invalid request.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: State distributor not found.
 *       500:
 *         description: Internal server error.
 */
router.delete(
  "/delete/:id",
  protect,
  authorizeRoles("SUPER_ADMIN"),
  Deletestatedistcontroller,
);

//==================================
/**
 * @swagger
 * /api/stateDist/statedistributorprofile:
 *   get:
 *     summary: Get state distributor profile
 *     description: Returns the profile for the authenticated state distributor.
 *     tags:
 *       - State Distributor
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
 *         description: Profile not found.
 *       500:
 *         description: Internal server error.
 */
router.get(
  "/statedistributorprofile",
  protect,
  authorizeRoles("STATE_DISTRIBUTOR"),
  getstateDistProfileController,
);

/**
 * @swagger
 * /api/stateDist/statedistributorprofile-update:
 *   put:
 *     summary: Update state distributor profile
 *     description: Updates the authenticated state distributor profile and optional profile image.
 *     tags:
 *       - State Distributor
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               mobile:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               profileImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile updated successfully.
 *       400:
 *         description: Invalid request data.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: Profile not found.
 *       500:
 *         description: Internal server error.
 */
router.put(
  "/statedistributorprofile-update",
  protect,
  authorizeRoles("STATE_DISTRIBUTOR"),
  uploadProducts.single("profileImage"),
  updatestateDistProfileController,
);

/**
 * @swagger
 * /api/stateDist/Dist-distributor-latest:
 *   get:
 *     summary: Get latest district distributors
 *     description: Returns the latest district distributors for the authenticated state distributor.
 *     tags:
 *       - State Distributor
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Latest district distributors fetched successfully.
 *       400:
 *         description: Invalid request.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: District distributors not found.
 *       500:
 *         description: Internal server error.
 */
router.get(
  "/Dist-distributor-latest",
  protect,
  authorizeRoles("STATE_DISTRIBUTOR"),
  LatestDistdistributortget,
);

/**
 * @swagger
 * /api/stateDist/statedist-dashboard:
 *   get:
 *     summary: Get state distributor dashboard
 *     description: Returns dashboard metrics for the authenticated state distributor.
 *     tags:
 *       - State Distributor
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data fetched successfully.
 *       400:
 *         description: Invalid request.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: Dashboard data not found.
 *       500:
 *         description: Internal server error.
 */
router.get(
  "/statedist-dashboard",
  protect,
  authorizeRoles("STATE_DISTRIBUTOR"),
  getStateDashboardController,
);

//=============
/**
 * @swagger
 * /api/stateDist/by-state/{stateDistributorId}:
 *   get:
 *     summary: Get districts by state distributor
 *     description: Returns district distributors assigned to a state distributor.
 *     tags:
 *       - State Distributor
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: stateDistributorId
 *         required: true
 *         schema:
 *           type: string
 *         description: State distributor ID.
 *     responses:
 *       200:
 *         description: District distributors fetched successfully.
 *       400:
 *         description: Invalid request.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: State distributor or districts not found.
 *       500:
 *         description: Internal server error.
 */
router.get(
  "/by-state/:stateDistributorId",
  protect,
  authorizeRoles("SUPER_ADMIN"),
  getDistrictByStateController,
);
/**
 * @swagger
 * /api/stateDist/by-district/{districtDistributorId}:
 *   get:
 *     summary: Get shops by district distributor
 *     description: Returns shop users assigned to a district distributor.
 *     tags:
 *       - State Distributor
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: districtDistributorId
 *         required: true
 *         schema:
 *           type: string
 *         description: District distributor ID.
 *     responses:
 *       200:
 *         description: Shop users fetched successfully.
 *       400:
 *         description: Invalid request.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: District distributor or shops not found.
 *       500:
 *         description: Internal server error.
 */
router.get(
  "/by-district/:districtDistributorId",
  protect,
  authorizeRoles("SUPER_ADMIN"),
  getShopsByDistrictController,
);
export default router;
