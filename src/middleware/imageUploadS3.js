const dotenv = require("dotenv");
dotenv.config();
const multer = require("multer");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3-transform");
const sharp = require("sharp");
const { v4: uuid } = require("uuid");

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
});

// multer storage
const storage = multerS3({
  s3: new AWS.S3(),
  bucket: process.env.S3_BUCKET_NAME,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  shouldTransform: true,
  transforms: [
    {
      id: "resized",
      key: function (req, file, cb) {
        cb(null, `images/${uuid()}_${file.originalname}`);
      },
      transform: function (req, file, cb) {
        cb(null, sharp().resize(1000, 1000).jpeg());
      },
    },
  ],
});
// imgUpload
const imageUploadS3 = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = imageUploadS3;
