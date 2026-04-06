// import { Error } from "mongoose";
// import {CreateDistributorservice} from "../../service/Distributor/CreateDistributor.service.js";
// import { createDistributorController } from "../Authcontroller/Registercontroller/ditributor.controller.js";
import {CreateUserservice} from "../../service/User/CreateUser.service.js"
export const createUsercontroller =  async (req,res) => {
    try {
        
        const data = await CreateUserservice(req.body)
        res.status(200).json({msg:"Nuser Added" ,data})
    } catch (error) {
        
        res.status(500).json({error:error.message})
    }
}