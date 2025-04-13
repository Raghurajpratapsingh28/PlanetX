const multer = require("multer");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("./s3"); 

const storage = multer.memoryStorage(); 

const upload = multer({ storage });

const uploadToS3 = async (req, res, next) => {
  try {
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const folderName = "properties";
        const resourceType = file.mimetype.startsWith("video") ? "videos" : "images";
        const fileName = `${folderName}/${resourceType}/${Date.now()}-${file.originalname}`;

        const uploadParams = {
          Bucket: process.env.AWS_BUCKET_NAME, 
          Key: fileName, 
          Body: file.buffer,  
        };

        const result = await s3.send(new PutObjectCommand(uploadParams));

        file.url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
        console.log(file.url);
      }
    }
    
    next();
  } catch (error) {
    console.error("Error uploading to S3:", error);
    res.status(500).json({ message: "Error uploading files", error: error.message });
  }
};

module.exports = { upload, uploadToS3 };
