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

router.get(
  "/distdashget",
  verifyToken,
  authorizeRoles("superadmin", "distributor"),
  DistributorDashController,
);

//********************************************************** SuperAdmin Updated/Delet API
// update dist api superadmin dashboard
router.put(
  "/distributor/update/:id",
  verifyToken,
  authorizeRoles("superadmin"),
  upload.single("firmLogo"),
  updateDistcontroller,
);

// delete dist api superadmin dashboard
router.delete(
  "/distributor/delete/:id",
  verifyToken,
  authorizeRoles("superadmin"),
  deleteDistcontroller,
);
//***********************************************************  */
// update nuser api superadmin dashboard
router.put(
  "/nuser/update/:id",
  verifyToken,
  authorizeRoles("superadmin"),
  upload.single("firmLogo"),
  updateNusercontroller,
);

// delete nuser api superadmin dashboard
router.delete(
  "/nuser/delete/:id",
  verifyToken,
  authorizeRoles("superadmin"),
  deleteNusercontroller,
);

//*************************** */ Activate API USER

//diactivate dist api
router.patch(
  "/distributor/diactivate/:id",
  verifyToken,
  authorizeRoles("superadmin"),
  diactvatedistcontroller,
);

//activate dist api
router.patch(
  "/distributor/activate/:id",
  verifyToken,
  authorizeRoles("superadmin"),
  activateDistributor,
);

//distributor serch api
router.get(
  "/distributorsearch",
  verifyToken,
  authorizeRoles("superadmin"),
  SerchdisController,
);
export default router;
