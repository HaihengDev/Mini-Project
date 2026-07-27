import {PutObjectCommand} from '@aws-sdk/client-s3';
import r2 from '../config/r2.js';
import crypto from 'crypto';

export const uploadImage = async(req, res) => {
  try {
    if(!req.file) {
      return res.status(400).json({
        message: 'No image uploaded',
      });
    }

    const fileExtension = req.file.originalname.split('.').pop();

    const fileName = `images/${crypto.randomUUID()}.${fileExtension}`;

    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      key: fileName,
      Body: req.file.mimetype,
    });

    await r2.send(command);

    const imgUrl = `${process.env.R2_PUBLIC_URL}/${fileName}`;

    res.status(201).json({
      message: 'Image uploaded successfully',
      imgUrl,
      fileName,
    });
  } catch(err) {
    res.status(500).json({
      message: 'Failed to upload image',
      result: err.message,
    });
  }
}