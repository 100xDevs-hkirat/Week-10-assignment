import { RequestHandler } from "express";
import { Course, User } from "../mongoDB";
import { authenticateJwt } from "./middleware";
import mongoose from "mongoose";

export const getCourses: RequestHandler = async (req, res) => {
  const courses = await Course.find({ published: true });
  //   res.json({ courses });
  if (courses) {
    const user = await User.findOne({ _id: req.body.userId });
    if (user) {
      const recommendedCourses = courses.filter(
        (course) => !user.purchasedCourses.includes(course._id)
      );
      console.log(recommendedCourses);
      res.json({ courses: recommendedCourses });
    } else {
      console.log(courses);
      res.json({ courses });
    }
  } else {
    res.status(404).json({ message: "Course not found" });
  }
};

export const getCourseById: RequestHandler = async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  if (course) {
    res.json({ course });
  } else {
    res.status(404).json({ message: "Course not found" });
  }

  // if (course) {
  //   const user = await User.findOne({ _id: req.body.userId});
  //   if (user) {
  //     user.purchasedCourses.push(course);
  //     await user.save();
  //     res.json({ message: 'Course purchased successfully' });
  //   } else {
  //     res.status(403).json({ message: 'User not found' });
  //   }
  // } else {
  //   res.status(404).json({ message: 'Course not found' });
  // }
};

//purchase course
export const purchaseCourse: RequestHandler = async (req, res) => {
  //check if valid objectId
  if (!mongoose.isValidObjectId(req.params.courseId))
    return res.status(400).json(req.params.courseId + " is not a valid id");

  const course = await Course.findById(req.params.courseId);

  if (course) {
    const user = await User.findOne({ _id: req.body.userId });
    if (user && !user.purchasedCourses.includes(course._id)) {
      user.purchasedCourses.push(course._id);
      await user.save();
      res.json({ message: "Course purchased successfully" });
    } else {
      res
        .status(403)
        .json({ message: "User not found or course already purchased" });
    }
  } else {
    res.status(404).json({ message: "Course not found" });
  }
};

//remove course
export const removeCourse: RequestHandler = async (req, res) => {
  //check if valid objectId
  if (!mongoose.isValidObjectId(req.params.courseId))
    return res.status(400).json(req.params.courseId + " is not a valid id");

  const course = await Course.findById(req.params.courseId);

  console.log("hi");

  if (course) {
    const user = await User.findOne({ _id: req.body.userId });
    if (user && user.purchasedCourses.includes(course._id)) {
      user.purchasedCourses.splice(
        user.purchasedCourses.indexOf(course._id),
        1
      );
      await user.save();
      res.json({ message: "Course removed successfully" });
    } else {
      res
        .status(403)
        .json({ message: "User not found or course not purchased" });
    }
  } else {
    res.status(404).json({ message: "Course not found" });
  }
};

//create course
export const createCourse: RequestHandler = async (req, res) => {
  const { title, description, imageLink, price, userId } = req.body;

  if (!title || !description || !imageLink || !price || !userId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //check if user is admin
  const user = await User.findOne({ _id: userId });

  if (!user?.isAdmin) {
    return res.status(400).json({ message: "User not admin" });
  }

  const course = new Course({
    title,
    description,
    imageLink,
    price,
    author: userId,
    published: true,
  });
  await course.save();
  res.json({ message: "Course created successfully", courseId: course.id });
};
