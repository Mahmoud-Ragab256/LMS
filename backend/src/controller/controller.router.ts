import express from "express";
import authRouter from "./auth/auth.router.js";
import coursesRouter from "./course/course.router.js";

const router = express.Router();

router.use('/auth', authRouter)
router.use('/courses', coursesRouter)


export default router;