import upload from "../../config/multer.js";
import multer from "multer";
import express from "express";
const router = express.Router();
import { createUsercontroller } from "../../controller/User/CreateUser.controller.js";
import { GetuserController } from "../../controller/User/GetUser.controller.js";
import { NuserDashController } from "../../controller/User/UserDashboard.controller.js";
import { verifyToken } from "../../middlewares/authmiddlewares.js";
import { authorizeRoles } from "../../middlewares/rolemiddleware.js";
import { updateNusercontroller } from "../../controller/Distributor/User/update.controller.js";
import { deleteNusercontroller } from "../../controller/Distributor/User/delete.controller.js";

/**
 * @swagger
 * /api/nuserapi/create:
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

router.post("/create",
  verifyToken,
  authorizeRoles("superadmin","distributor"),
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

router.get("/get",verifyToken,
  authorizeRoles("superadmin","distributor"),  GetuserController);

/**
 * @swagger
 * /api/userdashget/get:
 *   get:
 *     summary: Get all nuser dashboard
 *     responses:
 *       200:
 *         description: List of  nuser dashboard fetched successfully
*/
router.get("/userdashget",
  verifyToken,
  authorizeRoles("nuser"),NuserDashController);



// update api distibutor dashboard
router.put(
  "/nuser/update/:id",
  verifyToken,
  authorizeRoles("superadmin"),
  upload.single("firmLogo"),
  updateNusercontroller,
);

// delete api distibutor dashboard
router.delete(
  "/nuser/delete/:id",
  verifyToken,
  authorizeRoles("superadmin"),
  deleteNusercontroller,
);

export default router;
