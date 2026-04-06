import register from "../../../models/AuthModel/Registermodel/register.js";
import bcrypt from "bcryptjs";

export const createregister = async (data) => {
    return await register.create(data)

    
}