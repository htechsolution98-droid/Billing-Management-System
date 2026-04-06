// import { CreateDistributorservice } from "../../service/Distributor/CreateDistributor.service.js";

// export const createcontroller = async (req, res) => {
//   try {
//     const { password, confirmPassword } = req.body;

//     // ✅ Confirm Password Check
//     if (password !== confirmPassword) {
//       return res.status(400).json({
//         message: "Password and Confirm Password do not match",
//       });
//     }

//     // Call Service
//     const data = await CreateDistributorservice(req.body);

//     res.status(201).json({
//       message: "Distributor Added Successfully",
//       data,
//     });
//   } catch (error) {
//     res.status(500).json({
//       error: error.message,
//     });
//   }
// };


import { CreateDistributorservice } 
from "../../service/Distributor/CreateDistributor.service.js";

export const createcontroller = async (req, res, next) => {

  try {

    const { password, confirmPassword } = req.body;

    // Confirm Password Check
    if (password !== confirmPassword) {

      return res.status(400).json({
        message: "Password and Confirm Password do not match",
      });

    }

    // Call Service
    const data =
      await CreateDistributorservice(req.body);

    res.status(201).json({
      message: "Distributor Added Successfully",
      data,
    });

  } catch (error) {

    next(error); // ✅ Important

  }

};