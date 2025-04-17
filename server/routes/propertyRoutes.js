const express = require("express");
const {
  addProperty,
} = require("../controllers/propertyControllers/addPropertyController");
const {
  updateProperty,
} = require("../controllers/propertyControllers/updatePropertyController");
const { upload, uploadToS3 } = require("../utils/multur");
const {
  getActiveProperties,
} = require("../controllers/propertyControllers/showActivePropertyController");
const {
  submitFeedbackAndDeleteProperty,
} = require("../controllers/propertyControllers/deleteAndFeedbackController");
const {
  getAvailableProperties,
} = require("../controllers/propertyControllers/getAvailableProperty");
const {
  postReview,
} = require("../controllers/propertyControllers/addReviewController");
const {
  editReview,
  deleteReview,
} = require("../controllers/propertyControllers/editNdeleteReviewController");
const {
  getNearbyProperties,
} = require("../controllers/nearbyLocationControllers/nearbyLocationController");
const {
  getPropertiesByCategory,
} = require("../controllers/propertyControllers/getCatogoryController");
const {
  getNotifications,
} = require("../controllers/userControllers/getNotificationController");
const getFilteredProperty = require("../controllers/propertyControllers/getFilteredProperty");
const {
  getPropertyById,
} = require("../controllers/propertyControllers/getPropertyById");
const {
  getReviews,
} = require("../controllers/propertyControllers/getReviewsController.js"); // New controller
const { postNotification } = require("../controllers/adminPanelControllers/postNotificationController");
const { postNotifications } = require("../controllers/propertyControllers/postNotificationController");

const router = express.Router();

//seller
router.get("/alluser-properties", getActiveProperties);
router.post(
  "/add",
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "video", maxCount: 1 },
  ]),
  uploadToS3,
  addProperty
);
router.patch(
  "/:propertyId",
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "video", maxCount: 1 },
  ]),
  uploadToS3,
  updateProperty
);
router.post("/deleteProperty", submitFeedbackAndDeleteProperty);

//buyer
router.get("/availableProperty", getAvailableProperties);
router.get("/availableFilteredProperty", getFilteredProperty);
router.post("/add-review", postReview);
router.patch("/edit-review/:reviewId", editReview);
router.delete("/delete-review/:reviewId", deleteReview);
router.get("/nearby-properties", getNearbyProperties);
router.get("/category-properties", getPropertiesByCategory);
router.get("/notification/:userId", getNotifications);
router.get("/getProperty/:propertyId", getPropertyById);
router.get("/reviews/:propertyId", getReviews); // New route
router.post("/post-notifications",postNotifications);



module.exports = router;