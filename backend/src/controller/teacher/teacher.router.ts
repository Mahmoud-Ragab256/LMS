import express from "express";
import { getTeachers } from "./teacher.controller.js";


const teacherRouter = express.Router();

teacherRouter.get("/", getTeachers)

export default teacherRouter;