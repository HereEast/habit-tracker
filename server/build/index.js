var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose.connect(process.env.MONGODB_CONNECTION_STRING || "");
            app.listen(SERVER.PORT, () => {
                console.log(`🚀 Server is listening on port ${SERVER.PORT}.`);
            });
        }
        catch (err) {
            console.log(err);
        }
    });
}
start();
