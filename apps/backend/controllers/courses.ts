import { RequestHandler } from "express";
import { Course, User } from "../mongoDB";
import { authenticateJwt } from "./middleware";

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
