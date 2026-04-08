import {GetProductservice} from "../../../service/User/Product/Getproduct.service.js"

export const GetProductController = async (req,res) => {
    try {
        const data =await  GetProductservice();
        res.status(200).json(data)
    } catch (error) {
        
        res.status(200).json({error:error.message})
    }
}