import mongoose from 'mongoose';

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/TestAPI';

export const connectDB = async () => {
  try {
    if (!uri) {
      console.log('MONGO URI is not configured in .env file!');
    }

    await mongoose.connect(uri);
    console.log('MONGO_DB is connected successfully.');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
