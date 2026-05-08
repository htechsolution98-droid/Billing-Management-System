import express from "express";
import {
  CreateController,
  GetController,
  EditController,
  DeleteController,
} from "../../controller/Distributor/SuperAdmin/MasterShop/MasterShop.controller.js";
import { verifyToken } from "../../middlewares/authmiddlewares.js";
import { authorizeRoles } from "../../middlewares/rolemiddleware.js";

const router = express.Router();

router.post(
  "/add",
  verifyToken,
  authorizeRoles("superadmin"),
  CreateController,
);

router.get(
  "/get",
  verifyToken,
  authorizeRoles("superadmin"),
  GetController,
);

router.put(
  "/update/:id",
  verifyToken,
  authorizeRoles("superadmin"),
  EditController,
);

router.delete(
  "/delete/:id",
  verifyToken,
  authorizeRoles("superadmin"),
  DeleteController,
);

export default router;
