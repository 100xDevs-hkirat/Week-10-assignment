import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { parse } from "cookie";

export const authenticateJwt: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // const cookies = parse(req.headers.cookie || "");
  // const cookie_token = cookies.token || "";
  // console.log({ cookie_token, authHeader });

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // if (!cookie_token)
    return res.status(401).json({ message: "Invalid token" });
  }

  const token = authHeader?.split(" ")[1]; //?? cookie_token;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.SECRET!, (err, decoded) => {
    if (err || !decoded || typeof decoded === "string") {
      //   console.log(err);
      return res.status(403).json({ message: "Invalid token" });
    }

    req.body = { ...req.body, userId: decoded.userId };
    next();
  });
};
