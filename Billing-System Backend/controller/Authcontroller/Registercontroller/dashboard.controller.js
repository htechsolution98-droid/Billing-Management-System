export const dashboardController = async (req, res) => {

  try {

    res.status(200).json({
      message: "Dashboard Access Successful",
      user: {
        id: req.user.id,
        role: req.user.role
      }
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};