import { createCustomerservice } from "../../services/Customer/customer.service.js";
import { getProductsByShopCodeService } from "../../services/Customer/customer.service.js";
export const customerRegisterController = async (req, res) => {
  try {
    const {
      customerName,
      mobile,
      email,
      password,
      address,
      state,
      district,
      area,
      pincode,
      profileImage,
    } = req.body;
    // 2. uploaded file path

    if (req.file) {
      profileImage = req.file.path;
    }
    const existingCustomer = await Customer.findOne({
      $or: [{ email }, { mobile }],
    });

    if (existingCustomer) {
      return res.status(400).json({
        success: false,
        message: "Email or mobile already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const customer = await createCustomerservice({
      customerName,
      mobile,
      email,
      password: hashedPassword,
      address,
      state,
      district,
      area,
      pincode,
    });

    const customerData = customer.toObject();

    delete customerData.password;

    res.status(201).json({
      success: true,
      message: "Customer registered successfully",
      customer: customerData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProductsByShopCode = async (req, res) => {
  try {
    const { shopCode } = req.params;

    const data = await getProductsByShopCodeService(shopCode);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Shop not found",
      });
    }

    return res.status(200).json({
      success: true,
      shopName: data.shopUser.name,
      products: data.products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
