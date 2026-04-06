import User from "../../models/User/User.js"

export const CreateUserservice = async (data) => {
    return await User.create(data)
}