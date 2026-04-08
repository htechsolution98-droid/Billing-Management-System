import Distributor from "../../models/Distributor/Distributor.js"

export const GetDistributorservice = async () => {
    return await Distributor.find().populate("superAdminId","name");
}   