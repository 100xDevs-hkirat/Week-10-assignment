import mongoose from "mongoose";


export const connectDB = async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/coursesdb', {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
      });
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection error:', error);
    }
  };