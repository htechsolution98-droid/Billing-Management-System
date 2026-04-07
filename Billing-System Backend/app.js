// app.js
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

const app = express();
app.use(cors());
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

// ── new protected routes ──────────────────────────────────────────────────────
import Distributor from "./routes/Distributor/Distributor.route.js";

app.use("/api/register", registerroutes);
app.use("/api/loginapi", loginroutes);
app.use("/api/distributorapi", Distributor);
app.use("/api/nuserapi", Nuser);
app.use("/api/productapi", Product);

//======================Swagger route===============================
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/api-test", (req, res) => {
  res.send("API working on Render");
});
export default app;
