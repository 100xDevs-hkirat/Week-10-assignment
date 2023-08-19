import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../mongoDB";

//get user by id
export const getUser: RequestHandler = async (req, res) => {
  const { userId } = req.body;

  //check if user exists
  if (!userId) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  //find user
  const result = await User.findOne({ _id: userId }).populate(
    "purchasedCourses"
  );

  const user = result?.toJSON();

  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  // Remove the password field from the user object
  const { password, ...rest } = user;

  res.json(rest);
};

//signup
export const signupUser: RequestHandler = async (req, res) => {
  const { name, email, password, isAdmin = false } = req.body;

  //check if all fields are provided
  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide all required fields",
    });
  }

  try {
    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //check if user exists
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(403).json({
        message: "Email already exists",
      });
    }

    //create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin,
    });
    await user.save();

    //generate a JWT
    const token = jwt.sign({ userId: user.id }, process.env["SECRET"]!, {
      expiresIn: "2d",
    });

    //return email and token
    res.status(201).json({
      user,
      token,
    });
  } catch (error: any) {
    //return error
    console.log(error);
    res.status(500).json({ message: "Registration failed", error: error });
  }
};

//signIn
export const signInUser: RequestHandler = async (req, res) => {
  const { email, password, isAdmin = false } = req.body;

  //check if all fields are provided
  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide all required fields",
    });
  }

  try {
    //find user
    const result = await User.findOne({
      email,
      isAdmin,
    });

    const user = result?.toJSON();

    //check if user exists
    if (!user) {
      return res.status(404).json({
        message: "User does not exist",
      });
    }

    //check if password matches
    const isMatch = await bcrypt.compare(password, user?.password ?? "");

    //return error if password does not match
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    //generate a JWT
    const token = jwt.sign({ userId: user._id }, process.env["SECRET"]!, {
      expiresIn: "2d",
    });

    //remove password from response
    const { password: _, ...userRest } = user;

    //return token
    res.status(200).json({ user: userRest, token });
  } catch (error) {
    //return error
    res.status(500).json({ message: "Login failed", error });
  }
};

//get Orders
// export const getOrders: RequestHandler = async (req, res) => {
//   const { userId } = req.body;

//   //check if user exists
//   if (!userId) {
//     return res.status(400).json({
//       message: "User not found",
//     });
//   }

//find user
//   const orders = await prisma.order.findMany({
//     where: {
//       userId,
//     },
//     include: {
//       book: true,
//     },
//   });

//   if (!orders) {
//     return res.status(400).json({
//       message: "User not found",
//     });
//   }

//   res.json(orders);
// };

// //Cancel Order
// export const cancelOrder: RequestHandler = async (req, res) => {
//   const { userId } = req.body;
//   const { orderId } = req.params;

//   //check if user exists
//   if (!orderId || !userId) {
//     return res.status(400).json({
//       message: "id not found",
//     });
//   }

//   //find user
//   const order = await prisma.order.findUnique({
//     where: {
//       id: parseInt(orderId),
//     },
//   });

//   if (!order) {
//     return res.status(400).json({
//       message: "Order not found",
//     });
//   }

//   //check if user is owner of order
//   if (order.userId !== userId) {
//     return res.status(400).json({
//       message: "User is not owner of this order",
//     });
//   }

//   //update user credit and remove book
//   const user = await prisma.user.update({
//     where: {
//       id: userId,
//     },
//     data: {
//       credit: {
//         increment: order.point,
//       },
//       ownedBooks: {
//         disconnect: {
//           id: order.bookId,
//         },
//       },
//     },
//     include: {
//       ownedBooks: true,
//       Order: true,
//     },
//   });

//   //delete order
//   await prisma.order.delete({
//     where: {
//       id: parseInt(orderId),
//     },
//   });

//   res.json(user);
// };

// //delete all user
// export const deleteAllUsers: RequestHandler = async (req, res) => {
//   //get api key from header
//   const apiKey = req.headers["x-api-key"];
//   //check if api key is valid
//   if (apiKey !== process.env.SECRET!) {
//     return res.status(401).json({
//       message: "Unauthorized",
//     });
//   }

//   try {
//     //delete all users
//     const users = await prisma.user.deleteMany();
//     res.json({ message: "Delete successful", users });
//   } catch (error) {
//     res.status(500).json({ message: "Delete failed", error });
//   }
// };
