import { Error } from "mongoose";
// import {CreateDistributorservice} from "../../service/Distributor/CreateDistributor.service.js";
// import { createDistributorController } from "../Authcontroller/Registercontroller/ditributor.controller.js";
import {CreateDistributorservice} from "../../service/Distributor/CreateDistributor.service.js"
export const createcontroller =  async (req,res) => {
    try {
        
        const data = await CreateDistributorservice(req.body)
        res.status(200).json({msg:"Distributor Added" ,data})
    } catch (error) {
        
        res.status(500).json({error:error.message})
    }
}