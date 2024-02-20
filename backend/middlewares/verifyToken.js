import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json("You are not authorized");
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(403).json("Token has expired");
      } else if (err.name === "JsonWebTokenError") {
        return res.status(403).json("Token is not valid");
      } else {
        return res.status(500).json("Internal Server Error");
      }
    }
    req.user = decoded;
    next();
  });
};

export default verifyToken;
