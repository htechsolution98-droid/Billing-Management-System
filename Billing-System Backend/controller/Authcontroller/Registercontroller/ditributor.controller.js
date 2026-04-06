import { createregister } 
from "../../../service/Authservice/Register/register.service.js";

export const createDistributorController = async (req, res) => {

  try {

    const data = {
      ...req.body,
      role: "distributor",        // force role
      superAdminId: req.user.id  // token  id
    };

    const distributor = await createregister(data);

    res.status(201).json({
      message: "Distributor created successfully",
      data: distributor
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};