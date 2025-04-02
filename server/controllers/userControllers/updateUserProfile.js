const User = require("../../modals/Users");

exports.updateUser = async (req, res) => {
  const mobile = req.user.mobile;
  const { name, email, whatsappMobile, role, state, city } = req.body;
  console.log(req.body);
  if (!mobile) {
    return res.status(400).json({ error: "Mobile number is required." });
  }

  try {
    const user = await User.findOne({ mobile });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (whatsappMobile) user.whatsappMobile = whatsappMobile;
    if (role) user.role = role;
    if (state) user.state = state;
    if (city) user.city = city;

    await user.save();

    res.status(200).json({ message: "Profile updated successfully.", user });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while updating the profile.",
      details: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { mobile } = req.body;

  if (!mobile) {
    return res.status(400).json({ error: "Mobile number is required." });
  }

  try {
    const user = await User.findOneAndDelete({ mobile });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while deleting the user.",
      details: error.message,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    let user;
    const mobile = req.user.mobile;

    if (req.user) {
      user = await User.findOne({ mobile });
    } else {
      return res
        .status(400)
        .json({ error: "Mobile number or authentication token required." });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while fetching user details.",
      details: error.message,
    });
  }
};
