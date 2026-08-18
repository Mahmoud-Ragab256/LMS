import express from "express";
import { registerTeacher, registerStudent, loginTeacher, loginStudent } from "./auth.controller.js";

const authRouter = express.Router();

authRouter
  .post('/register/teacher', registerTeacher)
  .post('/register/student', registerStudent)
  .post('/login/teacher', loginTeacher)
  .post('/login/student', loginStudent)


export default authRouter;