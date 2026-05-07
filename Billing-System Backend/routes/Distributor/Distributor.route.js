import upload from "../../config/multer.js";
import { createcontroller } from "../../controller/Distributor/CreateDistributor.controller.js";
import { GetDistributorController } from "../../controller/Distributor/GetDistributor.controller.js";
import { DistributorDashController } from "../../controller/Distributor/DistDashboard.controller.js";
import { verifyToken } from "../../middlewares/authmiddlewares.js";
import { authorizeRoles } from "../../middlewares/rolemiddleware.js";
import { updateDistcontroller } from "../../controller/Distributor/SuperAdmin/update.controller.js";
import { deleteDistcontroller } from "../../controller/Distributor/SuperAdmin/delete.controller.js";
import { diactvatedistcontroller } from "../../controller/Distributor/SuperAdmin/Disactivatedist.controller.js";
import { activateDistributor } from "../../controller/Distributor/SuperAdmin/activatedist.controller.js";
import { SerchdisController } from "../../controller/Distributor/SuperAdmin/serch.controller.js";
import { updateNusercontroller } from "../../controller/Distributor/SuperAdmin/userupdate.controller.js";
import { deleteNusercontroller } from "../../controller/Distributor/SuperAdmin/userdelete.controller.js";
import { getDistProfileController } from "../../controller/Distributor/GetDistributor.controller.js";
import { updateDistProfileController } from "../../controller/Distributor/GetDistributor.controller.js";
import { LatestDistributortget } from "../../controller/Distributor/GetDistributor.controller.js";

import express from "express";
const router = express.Router();

/**
 * @swagger
 * /api/distributorapi/create:
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

// router.post("/create", upload.single("corpo_certino"), createcontroller);
router.post(
  "/create",
  verifyToken,
  authorizeRoles("superadmin"),
  upload.single("corpo_certino"),
  createcontroller,
);

/**
 * @swagger
 * /api/distributorapi/get:
 *   get:
 *     summary: Get all distributors
 
 *     responses:
 *       200:
 *         description: List of distributors fetched successfully
 */

router.get(
  "/get",
  verifyToken,
  authorizeRoles("superadmin", "distributor"),
  GetDistributorController,
);

/**
 * @swagger
 * /api/distdashget/get:
 *   get:
 *     summary: Get all distributor Dashbaord

 *     responses:
*       200:
*         description: List of distributors Dashboard fetched successfully
*/

/**
 * @swagger
 * /api/distributorapi/distdashget:
 *   get:
 *     summary: Get distributor Dashboard data
 *     responses:
 *       200:
 *         description: Distributor dashboard data fetched successfully
 */

router.get(
  "/distdashget",
  verifyToken,
  authorizeRoles("superadmin", "distributor"),
  DistributorDashController,
);

//********************************************************** SuperAdmin Updated/Delet API
// update dist api superadmin dashboard
/**
 * @swagger
 * /api/distributorapi/distributor/update/{id}:
 *   put:
 *     summary: Update Distributor (SuperAdmin)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
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
 *         description: Distributor updated successfully
 */

/**
 * @swagger
 * /api/distributorapi/distributor/delete/{id}:
 *   delete:
 *     summary: Delete Distributor (SuperAdmin)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Distributor deleted successfully
 */

router.delete(
  "/distributor/delete/:id",
  verifyToken,
  authorizeRoles("superadmin"),
  deleteDistcontroller,
);
//***********************************************************  */
/**
 * @swagger
 * /api/distributorapi/nuser/update/{id}:
 *   put:
 *     summary: Update Nuser (SuperAdmin)
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
 *         description: Nuser updated successfully
 */

router.put(
  "/nuser/update/:id",
  verifyToken,
  authorizeRoles("superadmin"),
  upload.single("firmLogo"),
  updateNusercontroller,
);

/**
 * @swagger
 * /api/distributorapi/nuser/delete/{id}:
 *   delete:
 *     summary: Delete Nuser (SuperAdmin)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Nuser deleted successfully
 */

router.delete(
  "/nuser/delete/:id",
  verifyToken,
  authorizeRoles("superadmin"),
  deleteNusercontroller,
);

//*************************** */ Activate API USER

/**
 * @swagger
 * /api/distributorapi/distributor/diactivate/{id}:
 *   patch:
 *     summary: Deactivate Distributor
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Distributor deactivated
 */

router.patch(
  "/distributor/diactivate/:id",
  verifyToken,
  authorizeRoles("superadmin"),
  diactvatedistcontroller,
);

/**
 * @swagger
 * /api/distributorapi/distributor/activate/{id}:
 *   patch:
 *     summary: Activate Distributor
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Distributor activated
 */

router.patch(
  "/distributor/activate/:id",
  verifyToken,
  authorizeRoles("superadmin"),
  activateDistributor,
);

/**
 * @swagger
 * /api/distributorapi/distributorsearch:
 *   get:
 *     summary: Search Distributors
 *     responses:
 *       200:
 *         description: Search results returned
 */

router.get(
  "/distributorsearch",
  verifyToken,
  authorizeRoles("superadmin"),
  SerchdisController,
);

//Distributor Get & Updated Profile

/**
 * @swagger
 * /api/distributorapi/distributorprofile:
 *   get:
 *     summary: Get Distributor Profile
 *     responses:
 *       200:
 *         description: Profile data fetched
 */

router.get(
  "/distributorprofile",
  verifyToken,
  authorizeRoles("distributor"),
  getDistProfileController,
);

/**
 * @swagger
 * /api/distributorapi/distributorprofile-update:
 *   put:
 *     summary: Update Distributor Profile
 *     responses:
 *       200:
 *         description: Profile updated
 */

router.put(
  "/distributorprofile-update",
  verifyToken,
  authorizeRoles("distributor"),
  updateDistProfileController,
);

/**
 * @swagger
 * /api/distributorapi/latest-users:
 *   get:
 *     summary: Get latest distributors
 *     responses:
 *       200:
 *         description: Latest users fetched
 */

router.get("/latest-users", LatestDistributortget);

export default router;
