import upload from "../../config/multer.js";
import multer from "multer";
import express from "express";
const router = express.Router();
import { createUsercontroller } from "../../controller/User/CreateUser.controller.js";
import { GetuserController } from "../../controller/User/GetUser.controller.js";
import { NuserDashController } from "../../controller/User/UserDashboard.controller.js";
import { verifyToken } from "../../middlewares/authmiddlewares.js";
import { authorizeRoles } from "../../middlewares/rolemiddleware.js";
import { updateNusercontroller } from "../../controller/Distributor/SuperAdmin/userupdate.controller.js";
import { deleteNusercontroller } from "../../controller/Distributor/SuperAdmin/userdelete.controller.js";
import { getProfileController } from "../../controller/User/GetUser.controller.js";
import { updateProfileController } from "../../controller/User/GetUser.controller.js";

/**
 * @swagger
 * /api/nuserapi/create:
 *   post:
 *     summary: Create Nuser (Retailer)
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
  "/create",
  verifyToken,
  authorizeRoles("superadmin", "distributor"),
  (req, res, next) => {
    upload.single("firmLogo")(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({
          msg: "File too large. Max 2MB allowed",
        });
      }

      if (err) {
        return res.status(400).json({
          msg: err.message,
        });
      }

      next();
    });
  },
  createUsercontroller,
);

/**
 * @swagger
 * /api/nuserapi/get:
 *   get:
 *     summary: Get all  nuser
 *     responses:
 *       200:
 *         description: List of  nuser  fetched successfully
 */

router.get(
  "/get",
  verifyToken,
  authorizeRoles("superadmin", "distributor"),
  GetuserController,
);

/**
 * @swagger
 * /api/nuserapi/userdashget:
 *   get:
 *     summary: Get Nuser dashboard data
 *     responses:
 *       200:
 *         description: Dashboard data fetched successfully
 */
router.get(
  "/userdashget",
  verifyToken,
  authorizeRoles("nuser"),
  NuserDashController,
);

/**
 * @swagger
 * /api/nuserapi/nuser/update/{id}:
 *   put:
 *     summary: Update Nuser (Distributor Dashboard)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firmLogo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Nuser updated
 */

router.put(
  "/nuser/update/:id",
  verifyToken,
  authorizeRoles("superadmin", "distributor"),
  upload.single("firmLogo"),
  updateNusercontroller,
);

/**
 * @swagger
 * /api/nuserapi/nuser/delete/{id}:
 *   delete:
 *     summary: Delete Nuser (Distributor Dashboard)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Nuser deleted
 */

router.delete(
  "/nuser/delete/:id",
  verifyToken,
  authorizeRoles("superadmin", "distributor"),
  deleteNusercontroller,
);

/**
 * @swagger
 * /api/nuserapi/profile:
 *   get:
 *     summary: Get Nuser Profile
 *     responses:
 *       200:
 *         description: Profile data fetched
 */

router.get(
  "/profile",
  verifyToken,
  authorizeRoles("nuser"),
  getProfileController,
);

/**
 * @swagger
 * /api/nuserapi/update-profile:
 *   put:
 *     summary: Update Nuser Profile
 *     responses:
 *       200:
 *         description: Profile updated
 */

router.put(
  "/update-profile",
  verifyToken,
  authorizeRoles("nuser"),
  // upload.single("firmLogo"),
  updateProfileController,
);

export default router;
