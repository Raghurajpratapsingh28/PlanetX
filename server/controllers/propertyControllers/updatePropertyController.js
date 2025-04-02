const Property = require("../../modals/PropertyModals/BasePropertySchema");
const { PutObjectCommand, DeleteObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const s3 = require("../../utils/s3");

exports.updateProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const updatedData = req.body.propertyData
      ? JSON.parse(req.body.propertyData)
      : {};
    console.log(propertyId);

    if (!propertyId) {
      return res.status(400).json({ message: "Property ID is required" });
    }

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const PropertyCategory = Property.discriminators[property.category];
    if (!PropertyCategory) {
      return res.status(400).json({ message: "Invalid property category" });
    }

    if (req.files?.images) {
      const updatedImages = [...property.images];
      
      if (req.body.imageId) {
        const imageIndex = updatedImages.findIndex(
          (img) => img._id.toString() === req.body.imageId
        );
        
        if (imageIndex !== -1) {
          const oldImageUrl = updatedImages[imageIndex].url;
          const oldFileName = oldImageUrl.split('/').pop();

          const deleteParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `properties/images/${oldFileName}`, 
          };
          await s3.send(new DeleteObjectCommand(deleteParams));

          const file = req.files.images[0];
          const fileName = `${Date.now()}-${file.originalname}`;

          const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `properties/images/${fileName}`,
            Body: file.buffer,
          };

          const result = await s3.send(new PutObjectCommand(uploadParams));

          updatedImages[imageIndex] = {
            _id: updatedImages[imageIndex]._id,
            name: file.originalname,
            url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/properties/images/${fileName}`,
          };
        } else {
          return res.status(404).json({ message: "Image ID not found" });
        }
      } else {
        const newImages = await Promise.all(
          req.files.images.map(async (file) => {
            const fileName = `${Date.now()}-${file.originalname}`;

            const uploadParams = {
              Bucket: process.env.AWS_BUCKET_NAME,
              Key: `properties/images/${fileName}`,
              Body: file.buffer,
            };

            const result = await s3.send(new PutObjectCommand(uploadParams));

            return {
              name: file.originalname,
              url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/properties/images/${fileName}`,
            };
          })
        );
        updatedImages.push(...newImages);
      }

      updatedData.images = updatedImages;
    }

    if (req.files?.video) {
      const videoFile = req.files.video[0];
      const fileName = `${Date.now()}-${videoFile.originalname}`;

      const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `properties/videos/${fileName}`,
        Body: videoFile.buffer,
      };

      const result = await s3.send(new PutObjectCommand(uploadParams));
      
      updatedData.video = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/properties/videos/${fileName}`;
    }

    const updatedProperty = await PropertyCategory.findByIdAndUpdate(
      propertyId,
      { $set: updatedData },
      { new: true }
    );

    res.status(200).json({
      message: "Property updated successfully",
      property: updatedProperty,
    });
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({
      message: "Error updating property",
      error: error.message,
    });
  }
};
