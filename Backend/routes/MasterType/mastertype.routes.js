import protect from "../../middleware/auth.middleware.js";
import { authorizeRoles } from "../../middleware/role.middleware.js";
import { CreatemasterController } from "../../controllers/MasterType/mastertype.controller.js";
import { GetmasterController } from "../../controllers/MasterType/mastertype.controller.js";
import { updatemastercontroller } from "../../controllers/MasterType/mastertype.controller.js";
import { Deletemastercontroller } from "../../controllers/MasterType/mastertype.controller.js";
import express from "express";
const router = express.Router();

// Crud API

router.post(
  "/create",
  protect,
  authorizeRoles("SUPER_ADMIN"),
  CreatemasterController,
);
router.get("/get", protect, authorizeRoles("SUPER_ADMIN"), GetmasterController);
router.put(
  "/update/:id",
  protect,
  authorizeRoles("SUPER_ADMIN"),
  updatemastercontroller,
);
router.delete(
  "/delete/:id",
  protect,
  authorizeRoles("SUPER_ADMIN"),
  Deletemastercontroller,
);

export default router;
