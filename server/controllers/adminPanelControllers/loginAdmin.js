const jwt = require("jsonwebtoken");

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  if (email === "admin@gmail.com" && password === "@dminP@ss") {
    try {
      const accessToken = jwt.sign(
        { name: "admin", role: "admin" },
        process.env.JWT_SECRET,
        {
          expiresIn: "30d",
        }
      );
      res.status(200).json({ message: "Admin login successful", accessToken });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error generating token", error });
    }
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};
