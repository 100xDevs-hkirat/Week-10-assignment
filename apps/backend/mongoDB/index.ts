import mongoose from "mongoose";

// Define mongoose schemas
const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const userCourseMetadataSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  statue: { type: String, enum: ["active", "inactive", "deleted"] },
  progress: { type: Number },
  watchTime: { type: Number },
  completed: { type: Boolean },
  certified: { type: Boolean },
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageLink: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  authorName: { type: String },
  category: { type: String },
  published: { type: Boolean, required: true },
});

const User = mongoose.model("User", userSchema);
const UCMetadata = mongoose.model("UCMetadata", userCourseMetadataSchema);
const Course = mongoose.model("Course", courseSchema);

export { User, UCMetadata, Course };
