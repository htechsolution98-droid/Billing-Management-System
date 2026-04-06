import mongoose from "mongoose";
import dotenv from "dotenv";

import Register from "./models/AuthModel/Registermodel/register.js";

dotenv.config();

const createSuperAdmin = async () => {

  try {

    // MongoDB connect
    await mongoose.connect(process.env.MONGO_URI);

    console.log("DB Connected");

    // Check already exists
    const existingAdmin =
      await Register.findOne({
        role: "superadmin"
      });

    if (existingAdmin) {

      console.log("Superadmin already exists");
      process.exit();

    }

    // Create superadmin
    await Register.create({

      name: "Sujal Gujar",
      email: "sujalgujar0@gmail.com",
      password: "1120",
      role: "superadmin"

    });

    console.log("Superadmin created successfully ✅");

    process.exit();

  } catch (error) {

    console.log(error);

    process.exit();

  }

};

createSuperAdmin();