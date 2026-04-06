import {GetUserservice} from "../../service/User/GetUser.service.js"

export const GetuserController = async (req,res) => {
    try {
        const data =await  GetUserservice();
        res.status(200).json(data)
    } catch (error) {
        
        res.status(200).json({error:error.message})
    }
}