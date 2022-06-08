import mongoose from 'mongoose';

// Prints "MongoServerError: bad auth Authentication failed."
export const startMongoose = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 5000,
    });
    if (process.env.NODE_ENV !== 'test') {
      console.log('Connected mongodb');
    }
  } catch (error) {
    throw error;
  }
};
