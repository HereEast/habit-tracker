import express from "express";

import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { SERVER } from "./config/config.js";

dotenv.config();

import { taskRouter } from "./api/task.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(taskRouter);

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING || "");

    app.listen(SERVER.PORT, () => {
      console.log(`🚀 Server is listening on port ${SERVER.PORT}.`);
    });
  } catch (err) {
    console.log(err);
  }
}

start();
