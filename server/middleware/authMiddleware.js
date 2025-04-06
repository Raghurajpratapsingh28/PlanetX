const jwt = require("jsonwebtoken");

exports.authenticateToken = (req, res, next) => {

  const token = req.header('Authorization');
  // console.log(token); 

  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Invalid token" });
  }
};
