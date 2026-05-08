import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./Config/database.js";

const PORT = process.env.PORT || 5000;

// Database Connect
connectDB();

// Server Start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
