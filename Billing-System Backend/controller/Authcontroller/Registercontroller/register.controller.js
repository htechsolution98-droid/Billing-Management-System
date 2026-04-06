import {createregister} from "../../../service/Authservice/Register/register.service.js";

export const Registercontroller = async(req,res)=>{
    try {
        const data = await createregister(req.body)
        res.status(200).json({msg:"User Register",data})
        
    } catch (error) {
        res.status(500).json({error:error.message})
        // console.error({error:error.massage});        
    }
}