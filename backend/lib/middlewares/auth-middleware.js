const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({
      message: "Access denied, No token Provided",
    });
  }

  try {
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET); //Verify the token
    req.user = decodedUser;
    next();
  } catch (err) {
    res.status(403).json({
      message: "Invalid or Expired Token",
    });
  }
};

module.exports = authMiddleware;
