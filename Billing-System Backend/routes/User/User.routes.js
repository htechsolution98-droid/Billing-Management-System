import {createUsercontroller} from "../../controller/User/CreateUser.controller.js";
import {GetuserController} from "../../controller/User/GetUser.controller.js";

import express from "express";
const router = express.Router();

router.post("/create",createUsercontroller)
router.get("/get",GetuserController)

export default router