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
import * as mongodb from "mongodb";
// import * as connect from "../mongodb/connect.js";
import { Task } from "../mongodb/models/Task.js";
const ObjectId = mongodb.ObjectId;
const router = express.Router();
// Get all
router.route("/api").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const db = connect.getDb();
    // const data = await db.collection("todos").find({}).toArray();
    const data = yield Task.find({});
    if (!data.length) {
        console.log("❌ No tasks found.");
        return res.status(404).json({ message: "No tasks found." });
    }
    return res.json(data);
}));
// Get by ID
// router.route("/api/:id").get(async (req, res) => {
//   const db = connect.getDb();
//   const id = String(req.params.id);
//   const data = await db.collection("todos").findOne({ _id: new ObjectId(id) });
//   if (!data.length) {
//     throw new Error(`Task with ID: ${id} was not found.`);
//   }
//   return res.json(data);
// });
// Create
router.route("/api/create").post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = new Task({
        title: req.body.title,
    });
    yield task.save();
    // if (!data.length) {
    //   console.log("❌ No tasks found.");
    //   return res.status(404).json({ message: "No tasks found." });
    // }
    // return res.json(data);
}));
export { router as taskRouter };
