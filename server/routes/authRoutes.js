const express = require("express");
const { sendOTP, verifyOTP } = require("../controllers/authController");
const {
  updateUser,
  deleteUser,
  getUser,
} = require("../controllers/userControllers/updateUserProfile");
const { verifyNewUserOTP } = require("../controllers/authController");
const { authenticateToken } = require("../middleware/authMiddleware");
const { refreshToken } = require("../controllers/refreshTokenController");
const { logoutUser } = require("../controllers/logoutController");
const {
  loginAdmin,
} = require("../controllers/adminPanelControllers/loginAdmin");
const router = express.Router();

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/verify-newuser",verifyNewUserOTP);
router.post("/login-admin", loginAdmin);
router.patch("/update-user", authenticateToken, updateUser);
router.get("/get-user", authenticateToken, getUser);
router.delete("/delete-user", authenticateToken, deleteUser);
router.post("/logout", authenticateToken, logoutUser);
router.post("/refresh-token", refreshToken);

module.exports = router;
