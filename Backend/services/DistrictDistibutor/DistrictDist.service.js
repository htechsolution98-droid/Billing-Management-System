import  DistrictDistributor from "../../models/DistrictDist.js"

export const CreateDistrictDistService  = async (data) => {
    return await DistrictDistributor.create(data)
};

// export const GetDist = async (data) => {
//     return await StateDistributor.create(data)
// };

// export const UpdateDist = async (data) => {
//     return await StateDistributor.create(data)
// };

// export const DeletDist = async (data) => {
//     return await StateDistributor.create(data)
// };


