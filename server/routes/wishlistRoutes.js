const express = require("express");
const {
  createWishlist,
} = require("../controllers/wishlistControllers/addWishlistController");
const {
  getWishlists,
} = require("../controllers/wishlistControllers/getWishlistController");

const router = express.Router();
router.post("/add-wishlist", createWishlist);
router.get("/get-wishlist/:userId", getWishlists);
module.exports = router;
