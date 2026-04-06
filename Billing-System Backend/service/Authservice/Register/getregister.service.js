import register from "../../../models/AuthModel/Registermodel/register.js";

export const getregister = async () => {
    return await register.find()
    // return await register.find().select("-password");
}