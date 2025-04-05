const { S3Client, CreateBucketCommand } = require("@aws-sdk/client-s3");
const { STSClient, GetCallerIdentityCommand } = require("@aws-sdk/client-sts");
require("dotenv").config();

console.log("AWS Credentials Check:");
console.log("Access Key:", process.env.AWS_ACCESS_KEY_ID ? "Loaded" : "Missing");
console.log("Secret Key:", process.env.AWS_SECRET_ACCESS_KEY ? "Loaded" : "Missing");
console.log("Region:", process.env.AWS_REGION || "Missing");

if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
  throw new Error("AWS credentials are missing in environment variables.");
}

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,
});

const sts = new STSClient({
  credentials: { 
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,
});

async function checkCredentials() {
  try {
    const response = await sts.send(new GetCallerIdentityCommand({}));
    console.log("Valid credentials:", response);
  } catch (error) {
    console.error("Invalid credentials:", error);
  }
}

checkCredentials();

async function createBucketIfNotExists(bucketName) {
  try {
    await s3.send(new CreateBucketCommand({ Bucket: bucketName }));
    console.log(`Bucket ${bucketName} created successfully.`);
  } catch (error) {
    if (error.name === "BucketAlreadyOwnedByYou") {
      console.log(`Bucket ${bucketName} already exists.`);
    } else {
      console.error("Error creating bucket:", error);
    }
  }
}

createBucketIfNotExists("myawsbucket-planetx");


const bucketName = process.env.AWS_BUCKET_NAME;

module.exports = { s3, bucketName };

