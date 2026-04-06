// import { GetRegistercontroller } from "../../controller/Authcontroller/Registercontroller/getregister.controller.js";
import {createcontroller} from "../../controller/Distributor/CreateDistributor.controller.js";
import {GetDistributorController} from "../../controller/Distributor/GetDistributor.controller.js";

import express from "express";
const router = express.Router();

router.post("/create",createcontroller)
router.get("/get",GetDistributorController)

export default router