import {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
} from "../../controllers/Auth/auth.controller.js";

import protect from "../../middleware/auth.middleware.js";

import express from "express";
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", protect, getProfile);

router.get("/logout", protect, logoutUser);

export default router;
