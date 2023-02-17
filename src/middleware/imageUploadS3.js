const multer = require("multer");
const { S3Client } = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");
const { v4: uuid } = require("uuid");
const dotenv = require("dotenv");
dotenv.config();
// aws s3 account setting
const s3 = new S3Client({
	credentials: {
		accessKeyId: process.env.S3_ACCESS_KEY,
		secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
	},
	region: process.env.S3_BUCKET_REGION,
});
// multer storage
const storage = multerS3({
	s3,
	bucket: process.env.S3_BUCKET_NAME,
	key(req, file, cb) {
		cb(null, `images/${uuid()}_${file.originalname}`);
	},
	// acl: "public-read",
	// contentType: multerS3.AUTO_CONTENT_TYPE,
	// ContentEncoding: "base64", // required
});
// upload function
const imageUploadS3 = multer({
	storage,
	limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = imageUploadS3;
