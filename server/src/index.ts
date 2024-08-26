import express, { type Express } from "express";
import cors from "cors";
import "dotenv/config";

import * as connect from "./mongodb/connect.js";
import { todosRouter } from "./api/todos.js";

const PORT = process.env.PORT || 5050;

const app: Express = express();

app.use(cors()); // connect fe and be since they are using different PORTs
app.use(express.json()); // parse data in json format
app.use(todosRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}.`);

  connect.connectToServer();
});
