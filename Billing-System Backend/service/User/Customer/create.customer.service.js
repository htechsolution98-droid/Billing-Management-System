import Customer from "../../../models/User/Customer.js";

export const createCustomerservice = async (body) => {
    return await Customer.create(body)
}