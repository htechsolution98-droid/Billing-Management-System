import Distributor from "../../models/Distributor/Distributor.js"

export const CreateDistributorservice = async (data) => {
    return await Distributor.create(data)
}