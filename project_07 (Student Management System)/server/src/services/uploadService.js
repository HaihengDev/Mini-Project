import { PutObjectCommand } from '@aws-sdk/client-s3';
import r2 from '../config/r2.js';

class UploadService {
  async uploadImage(dir, file) {
    if (!file) {
      throw new Error('No image uploaded!');
    }

    const fileExtension = file.originalname.split('.').pop().toLowerCase();

    const fileName = `${dir}/${crypto.randomUUID()}.${fileExtension}`;

    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await r2.send(command);

    const imgUrl = `${process.env.R2_PUBLIC_URL}/${fileName}`;

    return {
      fileName,
      imgUrl,
    };
  }
}

export default new UploadService();
