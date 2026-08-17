import express from "express";
import { registerTeacher, registerStudent } from "./auth.controller.js";

const authRouter = express.Router();

authRouter
  .post('/register/teacher', registerTeacher)
  .post('/register/student', registerStudent)


export default authRouter;