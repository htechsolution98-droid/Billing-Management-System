import {GetDistributorservice} from "../../service/Distributor/GetDistributor.service.js";

export const GetDistributorController = async (req,res) => {
    try {
        const data =await  GetDistributorservice();
        res.status(200).json(data)
    } catch (error) {
        
        res.status(200).json({error:error.message})
    }
}