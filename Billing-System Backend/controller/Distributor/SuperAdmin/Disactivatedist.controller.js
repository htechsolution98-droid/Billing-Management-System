import Distributor from "../../../models/Distributor/Distributor.js";

export const diactvatedistcontroller = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, "diactvate id ");

    const diactivate = await Distributor.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true },
    );

    if (!diactivate) {
      return res
        .status(400)
        .json({ success: false, message: "Distributor Not Found" });
    }

    res.status(200).json({
      success: true,
      message: "Distributor Diactivated Successfully",
      distributor: diactivate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in distributor",
      error: error.message,
    });
  }
};
