const User = require("../modals/Users");

exports.logoutUser = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.refreshToken = null;

    await user.save();

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while logging out. Please try again.",
      error: error.message,
    });
  }
};
