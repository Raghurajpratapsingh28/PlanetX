const Notification = require("../../modals/Notification");


exports.postNotifications = async (req, res) => {
    const { userId, propertyId, title, text } = req.body;
    console.log(req.body);
  
    try {
      // Validate required fields
      if (!userId || !propertyId || !title || !text) {
        return res.status(400).json({ message: "All fields (userId, propertyId, title, text) are required." });
      }
  
      // Create and save new notification
      const notification = new Notification({
        userId,
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
