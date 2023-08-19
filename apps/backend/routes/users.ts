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

export const userRouter = express.Router();

// get userDetails
userRouter.get("/", authenticateJwt, getUser);

//sign up
userRouter.post("/signup", signupUser);

//sign in
userRouter.post("/signIn", signInUser);

// get orders
// userRouter.get("/orders", authenticateToken, getOrders);

// cancel order
// userRouter.delete("/cancel-order/:orderId", authenticateToken, cancelOrder);

//delete all users
// userRouter.delete("/deleteAll", deleteAllUsers); //todo remove
