const express = require("express");
const { getFeedback, postFeedback, deleteFeedback } = require("../controllers/feedbackController");

const router = express.Router();

router.get("/", getFeedback);
router.post("/", postFeedback);
router.delete("/:feedbackId", deleteFeedback);

module.exports = router;