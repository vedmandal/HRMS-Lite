import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";


export const markAttendance = async (req, res) => {
  try {
    const { employeeId, date, status } = req.body;

    if (!employeeId || !date || !status) {
      return res.status(400).send({
        success: false,
        message: "All fields are required"
      });
    }

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).send({
        success: false,
        message: "Employee not found"
      });
    }

    const attendance = await Attendance.create({
      employee: employeeId,
      date,
      status
    });

    return res.status(201).send({
      success: true,
      message: "Attendance marked successfully",
      attendance
    });

  } catch (error) {
   
    if (error.code === 11000) {
      return res.status(409).send({
        success: false,
        message: "Attendance already marked for this date"
      });
    }

    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in marking attendance"
    });
  }
};

export const getAttendanceByEmployee = async (req, res) => {
  try {
    const records = await Attendance.find({
      employee: req.params.employeeId
    }).sort({ date: -1 });

    return res.status(200).send({
      success: true,
      message: "Attendance records fetched successfully",
      records
    });

  } catch (error) {
   
    return res.status(500).send({
      success: false,
      message: "Error in fetching attendance records"
    });
  }
};