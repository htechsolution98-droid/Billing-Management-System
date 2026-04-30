import { createcustocontroller } from "../../controller/User/Customer/create.customer.controller.js";
import {
  getcustocontroller,
  getNUserCustomersController,
  getCustomersByNuserIdController,
} from "../../controller/User/Customer/get.customer.controller.js";
import { updateCustomerController } from "../../controller/User/Customer/update.customer.controller.js";
import { deleteCustomerController } from "../../controller/User/Customer/delete.customer.controller.js";
import { verifyToken } from "../../middlewares/authmiddlewares.js";
import { authorizeRoles, checkRole } from "../../middlewares/rolemiddleware.js";
import express from "express";
const router = express.Router();
/**
 * @swagger
 * /api/customer/create:
 *   post:
 *     summary: Create customer
 
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               productImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: customer created
 */
router.post("/create", verifyToken, checkRole("nuser"), createcustocontroller);

/**
 * @swagger
 * /api/customer/get:
 *   get:
 *     summary: Get all customerapi

 *     responses:
 *       200:
 *         description: List of customer fetched successfully
 */
router.get(
  "/get",
  verifyToken,
  authorizeRoles("superadmin", "nuser"),
  getcustocontroller,
);

router.get(
  "/my-customers",
  verifyToken,
  checkRole("nuser"),
  getNUserCustomersController,
);

// Distributor: fetch all customers for a specific NUser*****************************
router.get(
  "/nuser/:nuserId",
  verifyToken,
  authorizeRoles("superadmin", "distributor"),
  getCustomersByNuserIdController,
);

// NUser / SuperAdmin: update a customer
router.put(
  "/update/:id",
  verifyToken,
  authorizeRoles("superadmin", "nuser"),
  updateCustomerController,
);

// NUser / SuperAdmin: delete a customer
router.delete(
  "/delete/:id",
  verifyToken,
  authorizeRoles("superadmin", "nuser"),
  deleteCustomerController,
);

export default router;
