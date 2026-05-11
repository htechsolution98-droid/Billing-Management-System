import express from "express";
import cors from "cors";
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Routes
import authRoutes from "./routes/Auth/auth.routes.js";
import StateDistibutor from "./routes/StateDist/statedist.routes.js";
import DistrictDistibutor from "./routes/DistrictDist/districtdist.route.js";
import Shopuser from "./routes/Shopuser/shop.routes.js";

app.use("/api/auth", authRoutes);
app.use("/api/StateDist", StateDistibutor);
app.use("/api/DitrictDist", DistrictDistibutor);
app.use("/api/Shopuser", Shopuser);


// Test Route
app.get("/", (req, res) => {
  res.send("Billing Management API Running...");
});

export default app;
