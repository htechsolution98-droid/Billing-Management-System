import { CreateDistrictDistController } from "../../controllers/DistrictDist/Districtdist.controller.js";
import { GetDistdistController } from "../../controllers/DistrictDist/Districtdist.controller.js";
import { updateDistdistcontroller } from "../../controllers/DistrictDist/Districtdist.controller.js";
import { DeleteDistdistcontroller } from "../../controllers/DistrictDist/Districtdist.controller.js";
import { getdistrictProfileController } from "../../controllers/DistrictDist/districtprofile.controller.js";
import { updatedistrictdistProfileController } from "../../controllers/DistrictDist/districtprofile.controller.js";
import { LatestShopuserget } from "../../controllers/DistrictDist/districtprofile.controller.js";
import protect from "../../middleware/auth.middleware.js";
import { authorizeRoles } from "../../middleware/role.middleware.js";
import { createUploader } from "../../Config/multer.js";
import { getDistrictDashboardController } from "../../controllers/DistrictDist/Districtdash.controller.js";
const uploadProducts = createUploader("users");
import express from "express";
const router = express.Router();

//SatatDist Crud API

router.post(
  "/create",
  protect,
  authorizeRoles("SUPER_ADMIN", "STATE_DISTRIBUTOR"),
  CreateDistrictDistController,
);
router.get(
  "/get",
  protect,
  authorizeRoles("SUPER_ADMIN", "STATE_DISTRIBUTOR"),
  GetDistdistController,
);
router.put(
  "/update/:id",
  protect,
  authorizeRoles("SUPER_ADMIN", "STATE_DISTRIBUTOR"),
  updateDistdistcontroller,
);
router.delete(
  "/delete/:id",
  protect,
  authorizeRoles("SUPER_ADMIN", "STATE_DISTRIBUTOR"),
  DeleteDistdistcontroller,
);

//==================================
router.get(
  "/statedistributorprofile",
  protect,
  authorizeRoles("DISTRICT_DISTRIBUTOR"),
  getdistrictProfileController,
);

router.put(
  "/statedistributorprofile-update",
  protect,
  authorizeRoles("DISTRICT_DISTRIBUTOR"),
  uploadProducts.single("profileImage"),
  updatedistrictdistProfileController,
);

router.get(
  "/Shopuser-latest",
  protect,
  authorizeRoles("DISTRICT_DISTRIBUTOR"),
  LatestShopuserget,
);


router.get(
  "/District-dashboard",
  protect,
  authorizeRoles("DISTRICT_DISTRIBUTOR"),
  getDistrictDashboardController
);

export default router;
