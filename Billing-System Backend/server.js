import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";
import  {createSuperAdmin}  from "./superadmin.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const proxyVars = [
  "ALL_PROXY",
  "HTTP_PROXY",
  "HTTPS_PROXY",
  "GIT_HTTP_PROXY",
  "GIT_HTTPS_PROXY",
];

const clearInvalidLocalProxy = () => {
  for (const key of proxyVars) {
    const value = process.env[key];
    if (value && value.includes("127.0.0.1:9")) {
      delete process.env[key];
      console.warn(`Ignoring invalid proxy env: ${key}`);
    }
  }
};

const startServer = async () => {
  try {
    clearInvalidLocalProxy();

    await connectDB();
    await createSuperAdmin();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

startServer();
