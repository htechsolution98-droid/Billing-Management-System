import {getregister} from "../../../service/Authservice/Register/getregister.service.js";

export const GetRegistercontroller = async(req,res)=>{
    try {
        const data = await getregister()

        res.status(200).json(data)
        
    } catch (error) {
        res.status(500).json({error:error.message })
        // console.error({error:error.massage});        
    }
}