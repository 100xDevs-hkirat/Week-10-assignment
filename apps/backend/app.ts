import express from "express";
import cors from "cors";
// import { PrismaClient } from "@prisma/client";
import { userRouter } from "./routes/users";
import { courseRouter } from "./routes/course";
import mongoose from "mongoose";
// export const prisma = new PrismaClient();

async function main() {
  const app = express();
  const port = 5001;

  //middleware
  app.use(express.json());

  //cors policy
  app.use(
    cors({
      exposedHeaders: ["Content-Range", "X-Total-Count"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization", "cookies"],
      preflightContinue: false,
      origin: "*",
      credentials: true,
    })
  );

  //logging
  app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
  });

  //routes
  app.use("/api/user", userRouter);
  app.use("/api/course", courseRouter);

  // app.get("/", async (req, res) => {
  //   res.send("Hello, Express!");
  // });
  mongoose.connect(
    `mongodb+srv://${process.env["MONGO_USER"]}:${process.env["MONGO_PASS"]}@edkartcluster.3xdgrsd.mongodb.net/?retryWrites=true&w=majority`,
    { dbName: "courses" }
  );

  //start server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // await prisma.$disconnect();
  });

// export const prismaClient = prisma;
