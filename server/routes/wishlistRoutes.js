const express = require("express");
const {
  createWishlist,
} = require("../controllers/wishlistControllers/addWishlistController");
const {
  getWishlists, removeFromWishlist,
} = require("../controllers/wishlistControllers/getWishlistController");

const router = express.Router();

router.delete("/remove/:propertyId",removeFromWishlist)
router.post("/add-wishlist", createWishlist);
router.get("/get-wishlist/:userId", getWishlists);
module.exports = router;
