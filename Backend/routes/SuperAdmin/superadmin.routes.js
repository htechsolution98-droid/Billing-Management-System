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

router.patch(
  "/statedistributor/activate/:id",
  protect,
  authorizeRoles("SUPER_ADMIN"),
  activatestateDistributor,
);

router.patch(
  "/statedistributor/diactivate/:id",
  protect,
  authorizeRoles("SUPER_ADMIN"),
  diactvatestatedistcontroller,
);

router.get(
  "/statedistributor-latest",
  protect,
  authorizeRoles("SUPER_ADMIN"),
  LateststateDistributortget,
);

router.get(
  "/superadminprofile",
  protect,
  authorizeRoles("SUPER_ADMIN"),
  getSuperadminProfileController,
);

router.put(
  "/superadminprofile-update",
  protect,
  authorizeRoles("SUPER_ADMIN"),
  uploadProducts.single("profileImage"),
  updateSuperadminProfileController,
);


router.get(
  "/superadmin-dashboard",
  protect,
  authorizeRoles("SUPER_ADMIN"),
  getSuperAdminDashboardController
);

export default router;

export default router;
