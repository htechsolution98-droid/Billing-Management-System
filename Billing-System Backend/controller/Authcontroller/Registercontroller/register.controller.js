export const Registercontroller = async (req, res) => {

  try {

    let registerdata = {
      ...req.body
    };

    // 🚫 Only one SuperAdmin
    if (req.body.role === "superadmin") {

      const existingAdmin = await register.findOne({
        role: "superadmin"
      });

      if (existingAdmin) {

        return res.status(400).json({
          message: "Superadmin already exists ❌"
        });

      }

    }

    // ✅ Distributor created by SuperAdmin
    if (req.body.role === "distributor") {

      registerdata.superAdminId = req.user.id;

    }

    // ✅ NUser created by Distributor
    if (req.body.role === "nuser") {

      registerdata.distributorId = req.user.id;
      registerdata.superAdminId = req.user.superAdminId;

    }

    const data = await createregister(registerdata);

    res.status(200).json({
      msg: "User Register",
      data
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};