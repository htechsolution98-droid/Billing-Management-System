import { ShopuserController } from "../../controllers/Shopuser/shop.controller.js";
import { GetShopController } from "../../controllers/Shopuser/shop.controller.js";
import { updateShopcontroller } from "../../controllers/Shopuser/shop.controller.js";
import { DeleteShopcontroller } from "../../controllers/Shopuser/shop.controller.js";
import { getshopuserProfileController } from "../../controllers/Shopuser/shopuserprofile.controller.js";
import { updateshopuserProfileController } from "../../controllers/Shopuser/shopuserprofile.controller.js";
import { Latestcustomerget } from "../../controllers/Shopuser/shopuserprofile.controller.js";
import protect from "../../middleware/auth.middleware.js";
import { authorizeRoles } from "../../middleware/role.middleware.js";
import { getShopDashboardController } from "../../controllers/Shopuser/shopuserDash.controller.js";
import { createUploader } from "../../Config/multer.js";
const uploadProducts = createUploader("users");
import express from "express";
const router = express.Router();
//SatatDist Crud API

/**
 * @swagger
 * /api/shopuser/create:
 *   post:
 *     summary: Create shop user
 *     description: Creates a shop user under an authorized admin, state distributor, or district distributor account.
 *     tags:
 *       - Shop User
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
 *                 example: Rohan Mobile Shop
 *               contactPersonName:
 *                 type: string
 *                 example: Rohan Kumar
 *               gstNumber:
 *                 type: string
 *               panNumber:
 *                 type: string
 *               aadharNumber:
 *                 type: string
 *               bankName:
 *                 type: string
 *               accountNumber:
 *                 type: string
 *               ifscCode:
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
 *               firmLogo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Shop user created successfully.
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
  authorizeRoles("SUPER_ADMIN", "STATE_DISTRIBUTOR", "DISTRICT_DISTRIBUTOR"),
  uploadProducts.single("firmLogo"),
  ShopuserController,
);
/**
 * @swagger
 * /api/shopuser/get:
 *   get:
 *     summary: Get shop users
 *     description: Returns shop users visible to the authenticated admin or distributor.
 *     tags:
 *       - Shop User
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
 *           example: Rohan
 *         description: Optional shop search text.
 *     responses:
 *       200:
 *         description: Shop users fetched successfully.
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
  "/get",
  protect,
  authorizeRoles("SUPER_ADMIN", "STATE_DISTRIBUTOR", "DISTRICT_DISTRIBUTOR"),
  GetShopController,
);
/**
 * @swagger
 * /api/shopuser/update/{id}:
 *   put:
 *     summary: Update shop user
 *     description: Updates an existing shop user by ID.
 *     tags:
 *       - Shop User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Shop user ID.
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
 *               firmLogo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Shop user updated successfully.
 *       400:
 *         description: Invalid request data.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: Shop user not found.
 *       500:
 *         description: Internal server error.
 */
router.put(
  "/update/:id",
  protect,
  authorizeRoles("SUPER_ADMIN", "STATE_DISTRIBUTOR", "DISTRICT_DISTRIBUTOR"),
  uploadProducts.single("firmLogo"),
  updateShopcontroller,
);
/**
 * @swagger
 * /api/shopuser/delete/{id}:
 *   delete:
 *     summary: Delete shop user
 *     description: Deletes an existing shop user by ID.
 *     tags:
 *       - Shop User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Shop user ID.
 *     responses:
 *       200:
 *         description: Shop user deleted successfully.
 *       400:
 *         description: Invalid request.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: Shop user not found.
 *       500:
 *         description: Internal server error.
 */
router.delete(
  "/delete/:id",
  protect,
  authorizeRoles("SUPER_ADMIN", "STATE_DISTRIBUTOR", "DISTRICT_DISTRIBUTOR"),
  DeleteShopcontroller,
);

//==================================
/**
 * @swagger
 * /api/shopuser/statedistributorprofile:
 *   get:
 *     summary: Get shop user profile
 *     description: Returns the profile for the authenticated shop user.
 *     tags:
 *       - Shop User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Shop user profile fetched successfully.
 *       400:
 *         description: Invalid request.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: Shop user profile not found.
 *       500:
 *         description: Internal server error.
 */
router.get(
  "/statedistributorprofile",
  protect,
  authorizeRoles("ShopUser"),
  getshopuserProfileController,
);

/**
 * @swagger
 * /api/shopuser/statedistributorprofile-update:
 *   put:
 *     summary: Update shop user profile
 *     description: Updates the authenticated shop user's profile and optional profile image.
 *     tags:
 *       - Shop User
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
 *         description: Shop user profile updated successfully.
 *       400:
 *         description: Invalid request data.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: Shop user profile not found.
 *       500:
 *         description: Internal server error.
 */
router.put(
  "/statedistributorprofile-update",
  protect,
  authorizeRoles("ShopUser"),
  uploadProducts.single("profileImage"),
  updateshopuserProfileController,
);

/**
 * @swagger
 * /api/shopuser/customer-latest:
 *   get:
 *     summary: Get latest customers
 *     description: Returns the latest customers for the authenticated shop user.
 *     tags:
 *       - Shop User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Latest customers fetched successfully.
 *       400:
 *         description: Invalid request.
 *       401:
 *         description: Missing, invalid, or expired bearer token.
 *       404:
 *         description: Customers not found.
 *       500:
 *         description: Internal server error.
 */
router.get(
  "/customer-latest",
  protect,
  authorizeRoles("ShopUser"),
  Latestcustomerget,
);

/**
 * @swagger
 * /api/shopuser/shopuser-dashboard:
 *   get:
 *     summary: Get shop user dashboard
 *     description: Returns dashboard metrics for the authenticated shop user.
 *     tags:
 *       - Shop User
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
  "/shopuser-dashboard",
  protect,
  authorizeRoles("SHOP_USER"),
  getShopDashboardController,
);
export default router;
