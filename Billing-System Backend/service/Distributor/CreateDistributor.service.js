import Distributor from "../../models/Distributor/Distributor.js";
// import Register from "../../models/AuthModel/Registermodel/register.js";

export const CreateDistributorservice = async (data) => {

  await Distributor.create(data);


};