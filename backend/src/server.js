import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";

import { APP_PORT, FRONTEND_BASE_URL, MONGO_DB_URI } from "./config/index.js";
import router from "./routes/index.js";
import errorHandlerMiddleware from "./middlewares/error-handler-middleware.js";
import { scheduledTask } from "./services/cron-job.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: FRONTEND_BASE_URL,
    methods: ["GET", "POST"],
  },
});
/* CONFIGURATIONS */
app.use(express.json({ limit: "5mb" }));

const corsOptions = {
  credentials: true,
  origin: [FRONTEND_BASE_URL],
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* STATIC FOLDER */
app.use("/uploads", express.static("./uploads"));

/* ABSOLUTE PATH OF BACKEND FOLDER */
const __filename = fileURLToPath(import.meta.url);
export const ROOT_PATH = path.dirname(__filename);

/* REGISTER ROUTES */

app.use("/api", router);

/* ERROR HANDLER MIDDLEWARE */

app.use(errorHandlerMiddleware);
/* MONGOOSE SETUP */
mongoose
  .connect(MONGO_DB_URI)
  .then(() => {
    console.log("MONGO DB CONNECTED SUCCESSFULLY 😍😍");
    /* CREATE SERVER */
    server.listen(APP_PORT, () => {
      console.log(`SERVER IS LISTNING ON PORT ${APP_PORT}`);
    });
  })
  .catch((err) => {
    console.log("SOMETHING WENT WRONG WHILE CONNECTING TO MONGO DB 😢😢");
    console.log(err);
  });

/* SOCKET IO */

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user?.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
