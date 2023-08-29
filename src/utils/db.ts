import mongoose, { ConnectOptions } from "mongoose";

const connectToDatabase = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName:"courses",
    } as ConnectOptions);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default connectToDatabase;