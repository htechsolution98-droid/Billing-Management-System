import {
  CreateDistController,
  Deletestatedistcontroller,
  updatestatedistcontroller,
  GetstatedistController,
} from "../../controllers/StateDist/statedist.controller.js";
import protect from "../../middleware/auth.middleware.js";
import { authorizeRoles } from "../../middleware/role.middleware.js";
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

export default router;
