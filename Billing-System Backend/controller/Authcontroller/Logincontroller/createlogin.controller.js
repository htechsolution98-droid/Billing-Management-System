import {loginService} from "../../../service/Authservice/Login/login.service.js";


export const logincontroller = async (req,res) => {
    try {
        const data = await loginService(req.body)
        res.status(200).json({msg: "Login Successful",data})
        
    } catch (error) {
        
        res.status(500).json({error:error.message })
    }
}