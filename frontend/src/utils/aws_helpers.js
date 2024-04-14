import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// import fs from ("node:fs");

const s3 = {
  bucket: process.env.REACT_APP_S3_BUCKET,
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
};
console.log(s3);

const s3Client = new S3Client({
  region: s3.region,
  credentials: {
    accessKeyId: s3.accessKeyId,
    secretAccessKey: s3.secretAccessKey,
  },
});

export const generatePresignedUrl = async (key) => {
  if (!key) {
    return;
  }
  const command = new GetObjectCommand({
    Bucket: s3.bucket,
    Key: key,
  });
  try {
    const url = await getSignedUrl(s3Client, command, { expiresIn: 600 });
    return url;
  } catch (err) {
    console.error(err);
  }
};
