import mongoose from 'mongoose';

export const connectToDatabase = async (mongodbUri: string): Promise<void> => {
  try {
    await mongoose.connect(mongodbUri, {});

    console.log('Connected to MongoDB');

    // Handle disconnects
    mongoose.connection.on('disconnected', () => {
      console.log('Lost MongoDB connection. Reconnecting...');
      setTimeout(async () => await connectToDatabase(mongodbUri), 3000);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};
