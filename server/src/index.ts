import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

import * as connect from "./mongodb/connect.js";
import { taskRouter } from "./api/tasks.js";

const PORT = process.env.PORT || 5050;

const app = express();

app.use(cors()); // connect fe and be since they are using different PORTs
app.use(express.json()); // parse data in json format
app.use(taskRouter);

start();

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING || "");

    app.listen(PORT, () => {
      console.log(`🚀 Server is listening on port ${PORT}.`);

      connect.connectToServer();
    });
  } catch (err) {
    console.log(err);
  }
}
