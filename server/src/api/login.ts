import express from "express";

import { login } from "../controllers/index.js";

const router = express.Router();

// Post
router.route("/").post(login);

export { router as loginRouter };
