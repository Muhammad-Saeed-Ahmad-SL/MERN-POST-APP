import express from "express";

import { googleSignIn, signin, signup } from "../controllers/user.js";

const router = express.Router();

// localhost:5000/auth/
router.post("/signin", signin);
router.post("/signup", signup);
router.post("/auth/google", googleSignIn);

export default router;
