// app.js
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// ── existing routes ───────────────────────────────────────────────────────────
import registerroutes from "./routes/Authroutes/Register/register.routes.js";
import loginroutes from "./routes/Authroutes/Login/login.routes.js";
import Nuser from "./routes/User/User.routes.js";
import Product from "./routes/User/Product.routes.js";
import Brand from "./routes/User/Brand.routes.js";
import Category from "./routes/User/Category.routes.js";

// ── new protected routes ──────────────────────────────────────────────────────
import Distributor from "./routes/Distributor/Distributor.route.js";

app.use("/api/register", registerroutes);
app.use("/api/loginapi", loginroutes);
app.use("/api/distributorapi", Distributor);
app.use("/api/nuserapi", Nuser);
app.use("/api/productapi", Product);
app.use("/api/barndapi", Brand);
app.use("/api/cetegoryapi", Category);

//======================Swagger route===============================
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/api-test", (req, res) => {
  res.send("API working on Render");
});
export default app;
