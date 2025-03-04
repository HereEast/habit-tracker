import express from "express";

import { login } from "../controllers/login.js";

const router = express.Router();

// Post
router.route("/login").post(login);

export { router as loginRouter };
