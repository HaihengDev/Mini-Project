import { PutObjectCommand } from '@aws-sdk/client-s3';
import { r2 } from '../config/r2.js';

export const uploadFile = async (file) => {
  try {
    const key = `products/${Date.now()}-${file.originalname}`;

    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await r2.send(command);

    const fileUrl = `${process.env.R2_PUBLIC_URL}/${process.env.R2_BUCKET}/${key}`;

    return fileUrl;
  } catch (err) {
    res.status(500).json({
      message: 'Server error',
      result: err.message,
    });
  }
};
