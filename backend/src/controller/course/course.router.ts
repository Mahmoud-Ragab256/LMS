import express from "express";
import { addCourse, deleteACourse, getAllTeacherCourses, getContent, getCourse, getCourses, updateCourseData } from "./course.controller.js";


const coursesRouter = express.Router();

coursesRouter
  .get('/', getCourses)
  .post('/', addCourse)
  .get('/teacher/:id', getAllTeacherCourses)
  .get('/:id', getCourse)
  .get('/:id/content', getContent)
  .put('/:id', updateCourseData)
  .delete('/:id', deleteACourse)


export default coursesRouter;