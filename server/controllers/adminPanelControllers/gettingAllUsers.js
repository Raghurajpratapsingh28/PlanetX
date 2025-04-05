const User = require("../../modals/Users");

const getAllUsers = async (req, res) => {
  try {
    // const role = req.user.role;
    // console.log(role);
    // if (role !== "admin") {
    //   return res.status(403).json({ message: "You are not an admin" });
    // }
    const users = await User.find()
      .select(
        "name mobile city email role whatsappMobile feedbacksGiven reviews"
      )
      .populate("feedbacksGiven")
      .populate("reviews");

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error while fetching users.",
      error: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
};
