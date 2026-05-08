import express from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Test Route
app.get("/", (req, res) => {
  res.send("Billing Management API Running...");
});

export default app;
