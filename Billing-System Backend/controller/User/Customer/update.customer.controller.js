import Customer from "../../../models/User/Customer.js";

export const updateCustomerController = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // NUser can only update their own customers
    if (
      req.user?.role === "nuser" &&
      customer.nuserId?.toString() !== req.user._id?.toString()
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    const allowedFields = [
      "customerName", "mobile", "email",  "gst",
      "address", "state", "district", "area", "pincode", "status",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        customer[field] = req.body[field];
      }
    });

    await customer.save();

    return res.status(200).json({ msg: "Customer updated", data: customer });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
