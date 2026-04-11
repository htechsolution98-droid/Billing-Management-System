import Register from "../../../models/AuthModel/Registermodel/register.js";

export const createregisterservice = async (data, creator = null) => {
  const { name, password, role } = data;
  const email = data.email?.trim().toLowerCase();

  const allowedRoles = ["superadmin", "distributor", "nuser"];

  if (!allowedRoles.includes(role)) {
    throw new Error("Invalid role");
  }

  const exist = await Register.findOne({ email });
  if (exist) {
    throw new Error("Email already exists");
  }

  let superAdminId = null;
  let distributorId = null;

  // Self registration rules
  if (!creator) {
    if (role === "superadmin") {
      const existingSuperAdmin = await Register.findOne({ role: "superadmin" });
      if (existingSuperAdmin) {
        throw new Error("Superadmin already exists");
      }
    }

    if (!["superadmin", "distributor", "nuser"].includes(role)) {
      throw new Error("Invalid role for self registration");
    }
  }

  // Superadmin can create distributor or nuser
  if (creator?.role === "superadmin") {
    if (role === "superadmin") {
      throw new Error("Superadmin cannot create another superadmin");
    }

    if (role === "distributor") {
      superAdminId = creator._id;
    }

    if (role === "nuser") {
      superAdminId = creator._id;
      distributorId = null;
    }
  }

  // Distributor can create only nuser
  if (creator?.role === "distributor") {
    if (role !== "nuser") {
      throw new Error("Distributor can create only nuser");
    }

    distributorId = creator._id;
    superAdminId = creator.superAdminId || null;
  }

  // NUser cannot create users
  if (creator?.role === "nuser") {
    throw new Error("NUser is not allowed to create users");
  }

  const user = await Register.create({
    name,
    email,
    password,
    role,
    superAdminId,
    distributorId,
  });

  if (user.role === "distributor" && !user.distributorId) {
    user.distributorId = user._id;
    await user.save();
  }

  return user;
};
