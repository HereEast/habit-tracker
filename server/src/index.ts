import express from "express";

import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { SERVER, CONNECTION_STRING } from "./config.js";

dotenv.config();

import { tasksRouter } from "./api/tasks.js";
import { usersRouter } from "./api/users.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/tasks", tasksRouter);
app.use("/api/users", usersRouter);

async function start() {
  try {
    await mongoose.connect(CONNECTION_STRING);

    app.listen(SERVER.PORT, () => {
      console.log(`🚀 Server is listening on port ${SERVER.PORT}.`);
    });
  } catch (err) {
    console.log(err);
  }
}

start();
