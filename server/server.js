const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const highlightRoutes = require("./routes/highlightRoutes");
const adminPanelRoutes = require("./routes/adminPanelRoutes");
const { authenticateToken } = require("./middleware/authMiddleware");
const { pushTestData } = require("./scripts/add_test");
dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
pushTestData();
app.use("/",(req,res)=>{
  res.json("Server running")
})
app.use("/api/auth", authRoutes);
app.use(authenticateToken);
app.use("/api/admin", adminPanelRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/highlights", highlightRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
