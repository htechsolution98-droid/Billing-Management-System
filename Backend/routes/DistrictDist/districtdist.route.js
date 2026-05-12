import { CreateDistrictDistController } from "../../controllers/DistrictDist/Districtdist.controller.js";
import { GetDistdistController } from "../../controllers/DistrictDist/Districtdist.controller.js";
import { updateDistdistcontroller } from "../../controllers/DistrictDist/Districtdist.controller.js";
import { DeleteDistdistcontroller } from "../../controllers/DistrictDist/Districtdist.controller.js";
import protect from "../../middleware/auth.middleware.js";
import { authorizeRoles } from "../../middleware/role.middleware.js";
import express from "express";
const router = express.Router();

//SatatDist Crud API

router.post(
  "/create",
  protect,
  authorizeRoles("SUPER_ADMIN","STATE_DISTRIBUTOR"),
  CreateDistrictDistController,
);
router.get(
  "/get",
  protect,
  authorizeRoles("SUPER_ADMIN","STATE_DISTRIBUTOR"),
  GetDistdistController,
);
router.put(
  "/update/:id",
  protect,
  authorizeRoles("SUPER_ADMIN","STATE_DISTRIBUTOR"),
  updateDistdistcontroller,
);
router.delete(
  "/delete/:id",
  protect,
  authorizeRoles("SUPER_ADMIN","STATE_DISTRIBUTOR"),
  DeleteDistdistcontroller,
);

export default router;