import multer from "multer";
import { S3Client } from "@aws-sdk/client-s3";
import multerS3 from "multer-s3";
import { v4 as uuid } from "uuid";
import { config } from "dotenv";

config();
// aws s3 account
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
// imgUpload
const imageUploadS3 = multer({
	storage,
	limits: { fileSize: 5 * 1024 * 1024 },
});

export default imageUploadS3;
