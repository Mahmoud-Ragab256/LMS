import express from "express";
import { changeTeacherPassword, getTeacher, getTeachers, updateTeacherData } from "./teacher.controller.js";
import { deleteTeacher, updateTeacherPassword } from "../../model/pg/teacherModel.js";


const teacherRouter = express.Router();

teacherRouter
  .get("/", getTeachers)
  .get("/:id", getTeacher)
  .put("/:id", updateTeacherData)
  .delete("/:id", deleteTeacher)
  .put("/:id/password", changeTeacherPassword);

export default teacherRouter;