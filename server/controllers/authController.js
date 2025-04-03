const jwt = require("jsonwebtoken");
const { sendSMS } = require("../utils/sendSMS");
const { generateOTP } = require("../utils/generateOTP");
const User = require("../modals/Users");

exports.sendOTP = async (req, res) => {
  const { mobile } = req.body;

  if (!mobile)
    return res.status(400).json({ message: "Mobile number is required" });

  const otp = generateOTP();
  const otpExpiry = Date.now() + 5 * 60 * 1000;

  try {
    let user = await User.findOne({ mobile });

    if (!user) {
      user = new User({ mobile, otp, otpExpiry });
    } else {
      user.otp = otp;
      user.otpExpiry = otpExpiry;
    }

    await user.save();
    await sendSMS(mobile, `Your OTP for Registering on Planet X is ${otp}`);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error sending OTP", error });
  }
};

exports.verifyOTP = async (req, res) => {
  const { mobile, otp } = req.body;

  if (!mobile || !otp) {
    return res.status(400).json({ message: "Mobile number and OTP are required" });
  }

  try {
    const user = await User.findOne({ mobile });

    if (!user) return res.status(404).json({ message: "User not found" });

    const { otp: storedOtp, otpExpiry } = user;

    if (Date.now() > otpExpiry) {
      return res.status(400).json({ message: "OTP expired" });
    }
    if (otp != storedOtp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const accessToken = jwt.sign(
      { userId: user._id, mobile: user.mobile, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    const refreshedToken = jwt.sign(
      { userId: user._id, mobile: user.mobile, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    user.otp = null;
    user.otpExpiry = null;
    user.refreshToken = refreshedToken;
    await user.save();

    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshedToken,
      user: {
        _id: user._id,
        name: user.name,
        mobile: user.mobile,
      },
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error verifying OTP", error: error.message });
  }
};


exports.verifyNewUserOTP = async (req, res) => {
  const { mobile, otp, name } = req.body;

  if (!mobile || !otp) {
    return res.status(400).json({ message: "Mobile number and OTP are required" });
  }

  try {
    let user = await User.findOne({ mobile });

    if (!user) {
      user = new User({ mobile, name, otp, otpExpiry: Date.now() + 5 * 60 * 1000 }); 
      await user.save();
    }

    if (Date.now() > user.otpExpiry) {
      return res.status(400).json({ message: "OTP expired" });
    }
    if (otp != user.otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

   
    const accessToken = jwt.sign(
      { userId: user._id, mobile: user.mobile, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    const refreshedToken = jwt.sign(
      { userId: user._id, mobile: user.mobile, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

   
    user.otp = null;
    user.otpExpiry = null;
    user.refreshToken = refreshedToken;
    await user.save();

    res.status(200).json({
      message: "User verified successfully",
      accessToken,
      refreshedToken,
      user: {
        _id: user._id,
        name: user.name,
        mobile: user.mobile,
      },
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error verifying OTP", error: error.message });
  }
};

