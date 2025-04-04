import express from "express";

import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { SERVER, CONNECTION_STRING } from "./config.js";

dotenv.config();

import { tasksRouter } from "./api/tasks.js";
import { usersRouter } from "./api/users.js";
import { entriesRouter } from "./api/entries.js";
import { timelineRouter } from "./api/timeline.js";
import { loginRouter } from "./api/login.js";

const app = express();

app.use(cors());
app.use(express.json());

// API Endpoints
app.use("/api/tasks", tasksRouter);
app.use("/api/users", usersRouter);
app.use("/api/entries", entriesRouter);
app.use("/api/timeline", timelineRouter);
app.use("/api/login", loginRouter);

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
