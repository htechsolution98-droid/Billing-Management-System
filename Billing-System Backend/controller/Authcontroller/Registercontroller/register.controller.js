import { createregisterservice } from "../../../service/Authservice/Register/register.service.js";

export const createregisterController = async (req, res) => {
  try {
    // If logged in
    const creator = req.user || null;
    console.log(creator, "creator");

    const user = await createregisterservice(req.body, creator);

    res.status(201).json({
      message: "Signup successful",

      user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
