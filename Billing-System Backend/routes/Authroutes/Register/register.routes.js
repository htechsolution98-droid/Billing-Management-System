import express from "express";

import { Registercontroller } from "../../../controller/Authcontroller/Registercontroller/register.controller.js";

import { GetRegistercontroller } from "../../../controller/Authcontroller/Registercontroller/getregister.controller.js";

// 🔐 Middleware import
import { verifyToken } from "../../../middlewares/authmiddlewares.js";
import { authorizeRoles } from "../../../middlewares/rolemiddleware.js";
import {createDistributorController} from "../../../controller/Authcontroller/Registercontroller/ditributor.controller.js";
import {createNUserController} from "../../../controller/Authcontroller/Registercontroller/nuser.controller.js";
import {dashboardController} from "../../../controller/Authcontroller/Registercontroller/dashboard.controller.js";
const router = express.Router();

// PUBLIC ROUTE
router.post("/createregister", Registercontroller);

// 🔐 PROTECTED ROUTE ( superadmin)
router.get("/getregister",verifyToken,authorizeRoles("superadmin"),GetRegistercontroller,);
router.post("/create-distributor",verifyToken,authorizeRoles("superadmin"),createDistributorController,);
router.post( "/create-nuser", verifyToken, authorizeRoles("distributor"), createNUserController);
router.get("/dashboard",verifyToken,authorizeRoles("superadmin", "distributor"),dashboardController);

export default router;
