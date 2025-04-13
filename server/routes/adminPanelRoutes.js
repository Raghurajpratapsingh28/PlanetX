const express = require("express");
const {
  filterProperties,
} = require("../controllers/adminPanelControllers/getPropertyByModification");
const {
  getAllUsers,
} = require("../controllers/adminPanelControllers/gettingAllUsers");
const {
  postNotification,
} = require("../controllers/adminPanelControllers/postNotificationController");
const router = express.Router();


router.get("/filter-properties", filterProperties);
router.get("/get-users", getAllUsers);
router.post("/post-notifications", postNotification);
module.exports = router;
