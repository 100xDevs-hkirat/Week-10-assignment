import {
  createCourse,
  getCourseById,
  getCourses,
} from "../controllers/courses";
import { authenticateJwt } from "../controllers/middleware";
import {
  // cancelOrder,
  // deleteAllUsers,
  // getOrders,
  getUser,
  signInUser,
  signupUser,
} from "../controllers/users";

import express from "express";

export const courseRouter = express.Router();

// get all courses
courseRouter.get("/", authenticateJwt, getCourses);

// get course by id
courseRouter.get("/:courseId", authenticateJwt, getCourseById);

// create course
courseRouter.post("/", authenticateJwt, createCourse);
