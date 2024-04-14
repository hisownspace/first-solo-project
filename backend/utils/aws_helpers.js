const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const fs = require("node:fs");
const { s3 } = require("../config/index.js");

const S3_LOCATION = `https://${s3.bucket}.s3.amazonaws.com/`;

const createUniqueFilename = (filename) => {
  const arr = filename.split(".");

  const ext = arr.pop();
  const base = arr.join(".");

  const date = new Date();

  const year = date.getFullYear();
  const month =
    date.getMonth() < 10
      ? "0" + (date.getMonth() + 1).toString()
      : date.getMonth() + 1;
  const day =
    date.getDate() < 10 ? "0" + date.getDate().toString() : date.getDate();
  const hour =
    date.getHours() < 10 ? "0" + date.getHours().toString() : date.getHours();
  const minute =
    date.getMinutes() < 10
      ? "0" + date.getMinutes().toString()
      : date.getMinutes();
  const second =
    date.getSeconds() < 10
      ? "0" + date.getSeconds().toString()
      : date.getSeconds();
  const ms =
    "0" * (3 - date.getMilliseconds().toString().length) +
    date.getMilliseconds().toString();
  const randomStr = (Math.random() + 0.01).toString(36).substring(2, 6);
  const newFilename = `${year}${month}${day}${hour}${minute}${second}${ms}-${base}-${randomStr}.${ext}`;

  return newFilename;
};

const s3Client = new S3Client({
  region: s3.region,
  credentials: {
    accessKeyId: s3.accessKeyId,
    secretAccessKey: s3.secretAccessKey,
  },
});

const uploadFileToS3 = async (file) => {
  const filename = createUniqueFilename(file.originalname);
  const fileBuffer = file.buffer;
  const command = new PutObjectCommand({
    Bucket: s3.bucket,
    Key: filename,
    Body: fileBuffer,
  });

  try {
    const response = await s3Client.send(command);
    return filename;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  uploadFileToS3,
};
