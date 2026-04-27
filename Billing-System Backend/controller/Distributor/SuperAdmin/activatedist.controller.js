import Distributor from "../../../models/Distributor/Distributor.js";
export const activateDistributor = async (req, res) => {
  try {

    const { id } = req.params;

    const distributor = await Distributor.findByIdAndUpdate(
      id,
      { isActive: true },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Distributor activated successfully",
      distributor,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error activating distributor",
    });

  }
};