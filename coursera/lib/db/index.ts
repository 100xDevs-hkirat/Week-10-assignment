import mongoose from 'mongoose';
// Define mongoose schemas
const userSchema = new mongoose.Schema({
  username: { type: String },
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

const adminSchema = new mongoose.Schema({
  username: String,
  password: String
});

export type adminType = {
  username: string,
  password: string,
  _id?: string
}

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean
});

export type CourseType = {
  title: string,
  description: string,
  price: number,
  imageLink: string,
  published: boolean,
  _id?: string
}

const getModel = (modelName: any, schema: any) => {
  try {
    return mongoose.model(modelName);
  } catch (error) {
    // Model does not exist, define and return it
    return mongoose.model(modelName, schema);
  }
};
const User = getModel('User', userSchema);
const Admin = getModel('Admin', adminSchema);
const Course = getModel('Course', courseSchema);

const { MONGODB_URI } = process.env;


// Ensure that the MongoDB connection is established
async function dbConnect() {

  if (!MONGODB_URI || MONGODB_URI.length == 0) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  if (mongoose.connection.readyState >= 1) {
    return;
  }

  return mongoose.connect(MONGODB_URI, { dbName: 'cr' });
}

export {
  User,
  Admin,
  Course,
  dbConnect,
}