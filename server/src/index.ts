import express from "express";
import cors from "cors";
// import mongoose from "mongoose";
import "dotenv/config";

import * as connect from "./mongodb/connect.ts";
import { taskRouter } from "./api/tasks.ts";

const PORT = process.env.PORT || 5050;

const app = express();

app.use(cors());
app.use(express.json());
app.use(taskRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}.`);

  connect.connectToServer();
});

// async function start() {
//   try {
//     await mongoose.connect(process.env.MONGODB_CONNECTION_STRING || "");

//     app.listen(PORT, () => {
//       console.log(`🚀 Server is listening on port ${PORT}.`);

//       connect.connectToServer();
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }

// start();
