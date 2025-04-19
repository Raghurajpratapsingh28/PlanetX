const Notification = require("../../modals/Notification");

exports.getNotifications = async (req, res) => {
  const { userId } = req.params;
  try {
    const notifications = await Notification.find({ adminId: userId })
      .populate("userId", "name") // Populate userId with the 'name' field
      .sort({ date: -1 });
    

    if (!notifications.length) {
      return res
        .status(404)
        .json({ message: "No notifications found for this user." });
    }

    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching notifications", error });
  }
};