import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./Config/swagger.js";
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Routes
import authRoutes from "./routes/Auth/auth.routes.js";
import StateDistibutor from "./routes/StateDist/statedist.routes.js";
import DistrictDistibutor from "./routes/DistrictDist/districtdist.route.js";
import Shopuser from "./routes/Shopuser/shop.routes.js";
import Brand from "./routes/Brand/brand.routes.js"
import Category from "./routes/Category/category.routes.js"
import Subcategory from "./routes/Subcategory/subcategory.routes.js"
import Product from "./routes/Product/product.routes.js"
import Customer from "./routes/Customer/customer.routes.js";
import Masteritem from "./routes/MasterType/mastertype.routes.js"
import SuperAdmin from "./routes/SuperAdmin/superadmin.routes.js";

app.use("/api/auth", authRoutes);
app.use("/api/stateDist", StateDistibutor);
app.use("/api/ditrictDist", DistrictDistibutor);
app.use("/api/shopuser", Shopuser);
app.use("/api/barnd", Brand);
app.use("/api/category", Category);
app.use("/api/subcategory", Subcategory);
app.use("/api/product", Product);
app.use("/api/customer", Customer);
app.use("/api/masteritem", Masteritem);
app.use("/api/superadmin", SuperAdmin);



// Test Route
app.get("/", (req, res) => {
  res.send("Billing Management API Running...");
});

export default app;
