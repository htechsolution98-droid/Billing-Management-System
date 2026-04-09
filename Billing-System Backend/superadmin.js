import Register from "./models/AuthModel/Registermodel/register.js";

export const createSuperAdmin = async () => {

  try {

    const existingAdmin = await Register.findOne({
      role: "superadmin"
    });

    if (existingAdmin) {

      console.log("Superadmin already exists ✅");
      return;

    }

    await Register.create({

      name: "Sujal Gujar",
      email: "sujalgujar0@gmail.com",
      password: "1120",
      role: "superadmin"

    });

    console.log("Superadmin created successfully ✅");

  } catch (error) {

    console.log("Superadmin creation error:", error);

  }

};