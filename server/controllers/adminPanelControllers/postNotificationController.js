const User = require("../../modals/Users");
const Notification = require("../../modals/Notification");

exports.postNotification = async (req, res) => {
  const { userId, heading, text } = req.body;
  console.log(req.body);

  const role = req.user.role;
  if (role !== "admin") {
    return res.status(403).json({ message: "You are not an admin" });
  }

  if (!userId || !heading || !text) {
    return res.status(400).json({
      message: "userId, heading, and text are required",
    });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const notification = new Notification({
      userId: user._id,
      heading,
      text,
    });

    await notification.save();

    res.status(200).json({ message: "Notification sent successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error sending notification", error: error.message });
  }
};
