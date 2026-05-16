import { CreateDistrictDistController } from "../../controllers/DistrictDist/Districtdist.controller.js";
import { GetDistdistController } from "../../controllers/DistrictDist/Districtdist.controller.js";
import { updateDistdistcontroller } from "../../controllers/DistrictDist/Districtdist.controller.js";
import { DeleteDistdistcontroller } from "../../controllers/DistrictDist/Districtdist.controller.js";
import { getdistrictProfileController } from "../../controllers/DistrictDist/districtprofile.controller.js";
import { updatedistrictdistProfileController } from "../../controllers/DistrictDist/districtprofile.controller.js";
import { LatestShopuserget } from "../../controllers/DistrictDist/districtprofile.controller.js";
import protect from "../../middleware/auth.middleware.js";
import { authorizeRoles } from "../../middleware/role.middleware.js";
import { createUploader } from "../../Config/multer.js";
import { getDistrictDashboardController } from "../../controllers/DistrictDist/Districtdash.controller.js";
const uploadProducts = createUploader("forms");
import express from "express";
const router = express.Router();

//SatatDist Crud API

/**
 * @swagger
 * /api/ditrictDist/create:
 *   post:
 *     summary: Create district distributor
 *     description: Creates a district distributor under an authorized super admin or state distributor account.
 *     tags:
 *       - District Distributor
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
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
 *               corpo_certificatno:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: District distributor created successfully.
 *       400:
 *         description: Invalid request data.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: Parent distributor or related resource not found.
 *       500:
 *         description: Internal server error.
 */
router.post(
  "/create",
  protect,
  authorizeRoles("SUPER_ADMIN", "STATE_DISTRIBUTOR"),
  uploadProducts.single("corpo_certificatno"),
  CreateDistrictDistController,
);
/**
 * @swagger
 * /api/ditrictDist/get:
 *   get:
 *     summary: Get district distributors
 *     description: Returns district distributors visible to the authenticated user.
 *     tags:
 *       - District Distributor
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
 *         description: District distributors fetched successfully.
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
  "/get",
  protect,
  authorizeRoles("SUPER_ADMIN", "STATE_DISTRIBUTOR"),
  GetDistdistController,
);
/**
 * @swagger
 * /api/ditrictDist/update/{id}:
 *   put:
 *     summary: Update district distributor
 *     description: Updates an existing district distributor by ID.
 *     tags:
 *       - District Distributor
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: District distributor ID.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
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
 *               corpo_certificatno:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: District distributor updated successfully.
 *       400:
 *         description: Invalid request data.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: District distributor not found.
 *       500:
 *         description: Internal server error.
 */
router.put(
  "/update/:id",
  protect,
  authorizeRoles("SUPER_ADMIN", "STATE_DISTRIBUTOR"),
  uploadProducts.single("corpo_certificatno"),
  updateDistdistcontroller,
);
/**
 * @swagger
 * /api/ditrictDist/delete/{id}:
 *   delete:
 *     summary: Delete district distributor
 *     description: Deletes an existing district distributor by ID.
 *     tags:
 *       - District Distributor
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: District distributor ID.
 *     responses:
 *       200:
 *         description: District distributor deleted successfully.
 *       400:
 *         description: Invalid request.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: District distributor not found.
 *       500:
 *         description: Internal server error.
 */
router.delete(
  "/delete/:id",
  protect,
  authorizeRoles("SUPER_ADMIN", "STATE_DISTRIBUTOR"),
  DeleteDistdistcontroller,
);

//==================================
/**
 * @swagger
 * /api/ditrictDist/statedistributorprofile:
 *   get:
 *     summary: Get district distributor profile
 *     description: Returns the profile for the authenticated district distributor.
 *     tags:
 *       - District Distributor
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
  authorizeRoles("DISTRICT_DISTRIBUTOR"),
  getdistrictProfileController,
);

/**
 * @swagger
 * /api/ditrictDist/statedistributorprofile-update:
 *   put:
 *     summary: Update district distributor profile
 *     description: Updates the authenticated district distributor profile and optional profile image.
 *     tags:
 *       - District Distributor
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
  authorizeRoles("DISTRICT_DISTRIBUTOR"),
  uploadProducts.single("profileImage"),
  updatedistrictdistProfileController,
);

/**
 * @swagger
 * /api/ditrictDist/Shopuser-latest:
 *   get:
 *     summary: Get latest shop users
 *     description: Returns the latest shop users for the authenticated district distributor.
 *     tags:
 *       - District Distributor
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Latest shop users fetched successfully.
 *       400:
 *         description: Invalid request.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: Shop users not found.
 *       500:
 *         description: Internal server error.
 */
router.get(
  "/Shopuser-latest",
  protect,
  authorizeRoles("DISTRICT_DISTRIBUTOR"),
  LatestShopuserget,
);

/**
 * @swagger
 * /api/ditrictDist/District-dashboard:
 *   get:
 *     summary: Get district distributor dashboard
 *     description: Returns dashboard metrics for the authenticated district distributor.
 *     tags:
 *       - District Distributor
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
  "/District-dashboard",
  protect,
  authorizeRoles("DISTRICT_DISTRIBUTOR"),
  getDistrictDashboardController,
);

export default router;
