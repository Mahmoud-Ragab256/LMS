import express from "express";
import { getCourses } from "./course.controller.js";


const coursesRouter = express.Router();

coursesRouter
  .get('/', getCourses)


export default coursesRouter;