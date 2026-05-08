import {
  Shopcreate,
  ShopGet,
  ShopEdit,
  ShopDelete,
} from "../../../../service/Distributor/Superadmin/Mastershop/Mastershop.service.js";

const sendError = (res, error) => {
  const message = error.message || "Something went wrong";
  const status =
    message.includes("Not Found") ? 404 :
    error.name === "CastError" ? 400 :
    error.name === "ValidationError" ? 400 :
    error.code === 11000 ? 409 :
    500;

  return res.status(status).json({
    success: false,
    message: error.code === 11000 ? "Shop name already exists" : message,
  });
};

export const CreateController = async (req, res) => {
  try {
    const data = await Shopcreate(req.body);

    return res.status(201).json({
      success: true,
      message: "Shop created successfully",
      data,
    });
  } catch (error) {
    console.error(error);
    return sendError(res, error);
  }
};

export const GetController = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const data = await ShopGet(page, limit);

    return res.status(200).json({
      success: true,
      ...data,
    });
  } catch (error) {
    console.error(error);
    return sendError(res, error);
  }
};

export const EditController = async (req, res) => {
  try {
    const data = await ShopEdit(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Shop updated successfully",
      data,
    });
  } catch (error) {
    console.error(error);
    return sendError(res, error);
  }
};

export const DeleteController = async (req, res) => {
  try {
    const data = await ShopDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Shop deleted successfully",
      data,
    });
  } catch (error) {
    console.error(error);
    return sendError(res, error);
  }
};
