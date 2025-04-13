const Property = require("../../modals/PropertyModals/BasePropertySchema");
require("../../modals/PropertyModals/ResidentialSchema");
require("../../modals/PropertyModals/EventspaceSchema");
require("../../modals/PropertyModals/HotelSchema");
require("../../modals/PropertyModals/OfficeSchema");
require("../../modals/PropertyModals/SharedWarehouseSchema");
require("../../modals/PropertyModals/ShopSchema");
require("../../modals/PropertyModals/WarehouseSchema");
require("../../modals/PropertyModals/pgSchema");
const User = require("../../modals/Users");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { s3, bucketName } = require("../../utils/s3"); 

exports.addProperty = async (req, res) => {
  try {
    console.log(JSON.parse(req.body.propertyData));
    console.log("images", req.files.images);

    const userId = req.user.userId;
    const propertyData = JSON.parse(req.body.propertyData);

    if (!userId || !propertyData) {
      return res.status(400).json({ message: "User ID and Property data are required" });
    }

    let images = [];
    if (req.files?.images) {
      images = await Promise.all(
        req.files.images.map(async (file) => {
          const fileName = `${Date.now()}-${file.originalname}`;
          const uploadParams = {
            Bucket: bucketName, 
            Key: `properties/images/${fileName}`,
            Body: file.buffer,
            ContentType: file.mimetype, 
          };

          await s3.send(new PutObjectCommand(uploadParams));

          return {
            name: file.originalname,
            url: `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/properties/images/${fileName}`,
          };
        })
      );
    }

    let video = null;
    if (req.files?.video) {
      console.log("video", req.files.video);
      const videoFile = req.files.video[0];
      const fileName = `${Date.now()}-${videoFile.originalname}`;
      const uploadParams = {
        Bucket: bucketName,
        Key: `properties/videos/${fileName}`,
        Body: videoFile.buffer,
        ContentType: videoFile.mimetype,
      };

      await s3.send(new PutObjectCommand(uploadParams));

      video = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/properties/videos/${fileName}`;
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const PropertyCategory = Property.discriminators[propertyData.category];
    console.log(PropertyCategory);
    // if (!PropertyCategory) {
    //   return res.status(400).json({ message: "Valid Property Category required!" });
    // }

    const newProperty = new PropertyCategory({
      ...propertyData,
      user: userId,
      images,
      video,
    });

    console.log(newProperty);
    const savedProperty = await newProperty.save();

    user.properties.push(savedProperty._id);
    await user.save();

    res.status(201).json({
      message: "Property added successfully",
      property: savedProperty,
    });
  } catch (error) {
    console.error("Error adding property:", error);
    res.status(500).json({ message: "Error adding property", error: error.message });
  }
};
