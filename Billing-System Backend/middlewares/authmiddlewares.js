import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({
      message: "Token required",
    });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded User:", decoded);

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid Token",
    });
  }
};
