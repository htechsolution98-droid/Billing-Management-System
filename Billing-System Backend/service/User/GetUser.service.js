import User from "../../models/User/User.js";

export const GetUserservice = async () => {
  return await User.find()
};
