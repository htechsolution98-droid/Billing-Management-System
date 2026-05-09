import { CreateDistController } from "../../controllers/StateDist/statedist.controller.js";
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
// router.post(
//   "/create",
//   protect,
//   authorizeRoles("SUPER_ADMIN"),
//   CreateDistController,
// );
// router.post(
//   "/create",
//   protect,
//   authorizeRoles("SUPER_ADMIN"),
//   CreateDistController,
// );
// router.post(
//   "/create",
//   protect,
//   authorizeRoles("SUPER_ADMIN"),
//   CreateDistController,
// );

export default router;