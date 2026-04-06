import {logincontroller} from "../../../controller/Authcontroller/Logincontroller/createlogin.controller.js";
import express from "express";
const router = express.Router();

router.post("/login",logincontroller);

export default router
