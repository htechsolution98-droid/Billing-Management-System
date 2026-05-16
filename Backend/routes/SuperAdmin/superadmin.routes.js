import protect from "../../middleware/auth.middleware.js";
import { authorizeRoles } from "../../middleware/role.middleware.js";
import { activatestateDistributor } from "../../controllers/SuperAdmin/superadmin.controller.js";
import { diactvatestatedistcontroller } from "../../controllers/SuperAdmin/superadmin.controller.js";
import { LateststateDistributortget } from "../../controllers/SuperAdmin/superadmin.controller.js";
import { getSuperadminProfileController } from "../../controllers/SuperAdmin/superadmin.controller.js";
import { updateSuperadminProfileController } from "../../controllers/SuperAdmin/superadmin.controller.js";
import { getSuperAdminDashboardController } from "../../controllers/SuperAdmin/superadmin.controller.js";
import express from "express";
import { createUploader } from "../../Config/multer.js";
const uploadProducts = createUploader("users");
const router = express.Router();

/**
 * @swagger
 * /api/superadmin/statedistributor/activate/{id}:
 *   patch:
 *     summary: Activate state distributor
 *     description: Activates a state distributor account by ID. Accessible to super admin users only.
 *     tags:
 *       - Super Admin
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
 *         description: State distributor activated successfully.
 *       400:
 *         description: Invalid request.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: State distributor not found.
 *       500:
 *         description: Internal server error.
 */
router.patch(
  "/statedistributor/activate/:id",
  protect,
  authorizeRoles("SUPER_ADMIN"),
  activatestateDistributor,
);

/**
 * @swagger
 * /api/superadmin/statedistributor/diactivate/{id}:
 *   patch:
 *     summary: Deactivate state distributor
 *     description: Deactivates a state distributor account by ID. Accessible to super admin users only.
 *     tags:
 *       - Super Admin
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
 *         description: State distributor deactivated successfully.
 *       400:
 *         description: Invalid request.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: State distributor not found.
 *       500:
 *         description: Internal server error.
 */
router.patch(
  "/statedistributor/diactivate/:id",
  protect,
  authorizeRoles("SUPER_ADMIN"),
  diactvatestatedistcontroller,
);

/**
 * @swagger
 * /api/superadmin/statedistributor-latest:
 *   get:
 *     summary: Get latest state distributors
 *     description: Returns the latest state distributor accounts for super admin users.
 *     tags:
 *       - Super Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Latest state distributors fetched successfully.
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
  "/statedistributor-latest",
  protect,
  authorizeRoles("SUPER_ADMIN"),
  LateststateDistributortget,
);

/**
 * @swagger
 * /api/superadmin/superadminprofile:
 *   get:
 *     summary: Get super admin profile
 *     description: Returns the authenticated super admin profile.
 *     tags:
 *       - Super Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Super admin profile fetched successfully.
 *       400:
 *         description: Invalid request.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: Super admin profile not found.
 *       500:
 *         description: Internal server error.
 */
router.get(
  "/superadminprofile",
  protect,
  authorizeRoles("SUPER_ADMIN"),
  getSuperadminProfileController,
);

/**
 * @swagger
 * /api/superadmin/superadminprofile-update:
 *   put:
 *     summary: Update super admin profile
 *     description: Updates the authenticated super admin profile and optional profile image.
 *     tags:
 *       - Super Admin
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
 *         description: Super admin profile updated successfully.
 *       400:
 *         description: Invalid request data.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: Super admin profile not found.
 *       500:
 *         description: Internal server error.
 */
router.put(
  "/superadminprofile-update",
  protect,
  authorizeRoles("SUPER_ADMIN"),
  uploadProducts.single("profileImage"),
  updateSuperadminProfileController,
);


/**
 * @swagger
 * /api/superadmin/superadmin-dashboard:
 *   get:
 *     summary: Get super admin dashboard
 *     description: Returns platform dashboard metrics for the authenticated super admin.
 *     tags:
 *       - Super Admin
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
  "/superadmin-dashboard",
  protect,
  authorizeRoles("SUPER_ADMIN"),
  getSuperAdminDashboardController
);

export default router;
