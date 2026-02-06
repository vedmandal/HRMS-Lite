import express from "express";
import {
  markAttendance,
  getAttendanceByEmployee
} from "../controller/attendance.controller.js";

const router = express.Router();


router.post("/mark-attendance", markAttendance);


router.get("/get-attendance/:employeeId", getAttendanceByEmployee);

export default router;