import Customer from "../../../models/User/Customer.js";

export const getCustomerservice = async () => {
    return await Customer.find();
}