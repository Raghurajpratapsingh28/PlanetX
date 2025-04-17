const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const highlightRoutes = require("./routes/highlightRoutes");
const adminPanelRoutes = require("./routes/adminPanelRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes")
const { authenticateToken } = require("./middleware/authMiddleware");
const { pushTestData } = require("./scripts/add_test");

dotenv.config();
console.log("ENV FILE LOADED:", process.env.AWS_ACCESS_KEY_ID? "Loaded" : "Not Loaded");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const startServer = async () => {
  try {
    await connectDB();

    
    // if (process.env.NODE_ENV !== "production") {
    //   await pushTestData();
    // }

    app.get("/", (req, res) => {
      res.send("Server is Ready");
    });

    
    app.use("/api/auth", authRoutes);

    // Protected Routes (Require authentication)
    app.use("/api/properties", authenticateToken, propertyRoutes);
    app.use("/api/wishlist", authenticateToken, wishlistRoutes);
    app.use("/api/highlights", authenticateToken, highlightRoutes);
    app.use("/api/admin", authenticateToken, adminPanelRoutes);
    app.use("/api/centralfeedback", authenticateToken ,feedbackRoutes); // Remove authenticateToken for GET

    // Start Server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  }
};

startServer();
