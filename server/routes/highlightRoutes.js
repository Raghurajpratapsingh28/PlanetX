const express = require("express");
const {
  getAvailablePropertiesForReel,
} = require("../controllers/highlightController/getHighlightController");
const router = express.Router();
router.get("/get-highlights", getAvailablePropertiesForReel);
module.exports = router;
