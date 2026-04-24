import Customer from "../../../models/User/Customer.js";

export const deleteCustomerController = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // NUser can only delete their own customers
    if (
      req.user?.role === "nuser" &&
      customer.nuserId?.toString() !== req.user._id?.toString()
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    await Customer.findByIdAndDelete(id);

    return res.status(200).json({ msg: "Customer deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
