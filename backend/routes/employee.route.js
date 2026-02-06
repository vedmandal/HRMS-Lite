import express from "express";
import {
  addEmployee,
  getEmployees,
  deleteEmployee
} from "../controller/employee.controller.js";

const router = express.Router();


router.post("/add-employee", addEmployee);


router.get("/get-employees", getEmployees);


router.delete("/delete-employee/:id", deleteEmployee);

export default router;