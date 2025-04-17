const Notification = require("../../modals/Notification");
const Property = require("../../modals/PropertyModals/BasePropertySchema")
const User = require("../../modals/Users")


exports.postNotifications = async (req, res) => {
    const {propertyId, title, text } = req.body;
    const userId = req.user.userId;
    console.log(req.body);
  
    try {
      // Validate required fields
      if (!userId || !propertyId || !title || !text) {
        return res.status(400).json({ message: "All fields (userId, propertyId, title, text) are required." });
      }
      
      const property = await Property.findById(propertyId)
      const adminId = property.user;
      if (!adminId) {
        return res.status(404).json({ message: "Property not found." });
      }
      // Check if the userId is valid
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      // Create and save new notification
      const notification = new Notification({
        userId,
        adminId:adminId,
        property: propertyId,
        heading: title,
        text,
        date: new Date(),
      });
  
      await notification.save();
  
      res.status(201).json(notification);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating notification", error });
    }
  }
