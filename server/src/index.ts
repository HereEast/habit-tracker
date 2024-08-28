import express from "express";
import cors from "cors";
import "dotenv/config";

import * as connect from "./mongodb/connect.js";
import { taskRouter } from "./api/task.js";

const PORT = process.env.PORT || 5050;

const app = express();

app.use(cors());
app.use(express.json());
app.use(taskRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}.`);

  connect.connectToServer();
});
