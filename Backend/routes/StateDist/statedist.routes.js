import {
  CreateDistController,
  Deletestatedistcontroller,
  updatestatedistcontroller,
  GetstatedistController,
} from "../../controllers/StateDist/statedist.controller.js";
import { getstateDistProfileController } from "../../controllers/StateDist/stateprofile.controller.js";
import { updatestateDistProfileController } from "../../controllers/StateDist/stateprofile.controller.js";
import { LatestDistdistributortget } from "../../controllers/StateDist/stateprofile.controller.js";
import protect from "../../middleware/auth.middleware.js";
import { authorizeRoles } from "../../middleware/role.middleware.js";
import { createUploader } from "../../Config/multer.js";
import { getStateDashboardController } from "../../controllers/StateDist/statedash.controller.js";
const uploadProducts = createUploader("users");
import express from "express";
const router = express.Router();

//SatatDist Crud API

router.post(
  "/create",
  protect,
  authorizeRoles("SUPER_ADMIN"),
  CreateDistController,
);

router.get(
  "/get",
  protect,
  authorizeRoles("SUPER_ADMIN"),
  GetstatedistController,
);
router.put(
  "/update/:id",
  protect,
  authorizeRoles("SUPER_ADMIN"),
  updatestatedistcontroller,
);
router.delete(
  "/delete/:id",
  protect,
  authorizeRoles("SUPER_ADMIN"),
  Deletestatedistcontroller,
);

//==================================
router.get(
  "/statedistributorprofile",
  protect,
  authorizeRoles("STATE_DISTRIBUTOR"),
  getstateDistProfileController,
);

router.put(
  "/statedistributorprofile-update",
  protect,
  authorizeRoles("STATE_DISTRIBUTOR"),
  uploadProducts.single("profileImage"),
  updatestateDistProfileController,
);

router.get(
  "/Dist-distributor-latest",
  protect,
  authorizeRoles("STATE_DISTRIBUTOR"),
  LatestDistdistributortget,
);


router.get(
  "/statedist-dashboard",
  protect,
  authorizeRoles("STATE_DISTRIBUTOR"),
  getStateDashboardController
);

export default router;
