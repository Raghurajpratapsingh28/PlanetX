const User = require("../modals/Users");

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token required" });
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }
    const newAccessToken = jwt.sign(
      { userId: user._id, mobile: user.mobile },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    res
      .status(400)
      .json({
        message: "Invalid or expired refresh token",
        error: error.message,
      });
  }
};
