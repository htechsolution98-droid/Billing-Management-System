import { createregister } 
from "../../../service/Authservice/Register/register.service.js";

export const createNUserController = async (req, res) => {

  try {

    const data = {
      ...req.body,
      role: "nuser",
      distributorId: req.user.id,
      superAdminId: req.user.id,
    };

    const nuser = await createregister(data);

    res.status(201).json({
      message: "NUser created successfully",
      data: nuser
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};