import {loginService} from "../../../service/Authservice/Login/login.service.js";


export const logincontroller = async (req,res) => {
    try {
        const data = await loginService(req.body)
          res.status(200).json({
      message: "Login successful",
      token: data.token,
      user: data.user,
    });
        
    } catch (error) {
        const statusCode =
          error.message === "User not found" || error.message === "Invalid password"
            ? 401
            : 500;

        res.status(statusCode).json({error:error.message })
    }
}
