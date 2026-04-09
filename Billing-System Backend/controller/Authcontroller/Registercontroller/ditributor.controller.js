import { createregister } 
from "../../../service/Authservice/Register/register.service.js";

import { CreateDistributorservice } 
from "../../../service/Distributor/CreateDistributor.service.js";

export const createDistributorController = async (req, res) => {

  try {

    // Step 1 → Create Register login
    const registerData = {

      name: req.body.name,
      email: req.body.email,
      password: req.body.password,

      role: "distributor",

      superAdminId: req.user.id

    };

    const registerUser = await createregister(registerData);

    // Step 2 → Create Distributor profile

    const distributorData = {

      ...req.body,

      superAdminId: req.user.id,

      corpo_certino: req.file?.path

    };

    const distributor =
      await CreateDistributorservice(distributorData);

    res.status(201).json({

      message: "Distributor created successfully",

      registerUser,
      distributor

    });

  }

  catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};