import express from "express";
import { addCourse, deleteACourse, getAllTeacherCourses, getCourse, getCourses, updateCourseData } from "./course.controller.js";


const coursesRouter = express.Router();

coursesRouter
  .get('/', getCourses)
  .post('/', addCourse)
  .get('/teacher/:id', getAllTeacherCourses)
  .get('/:id', getCourse)
  .put('/:id', updateCourseData)
  .delete('/:id', deleteACourse)


export default coursesRouter;