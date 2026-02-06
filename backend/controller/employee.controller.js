import EmployeeModel from "../models/Employee.js";

export const addEmployee = async (req, res) => {
  try {
    const { employeeId, fullName, email, department } = req.body;

    if (!employeeId || !fullName || !email || !department) {
      return res.status(400).send({
        success: false,
        message: "All fields are required"
      });
    }

    const exists = await EmployeeModel.findOne({ employeeId });
    if (exists) {
      return res.status(409).send({
        success: false,
        message: "Employee ID already exists"
      });
    }

    const employee = await EmployeeModel.create({
      employeeId,
      fullName,
      email,
      department
    });

    return res.status(201).send({
      success: true,
      message: "Employee added successfully",
      employee
    });

  } catch (error) {
  
    return res.status(500).send({
      success: false,
      message: "Error in adding employee"
    });
  }
};


export const getEmployees = async (req, res) => {
  try {
    const employees = await EmployeeModel.find().sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      message: "Employees fetched successfully",
      employees
    });

  } catch (error) {
   
    return res.status(500).send({
      success: false,
      message: "Error in getting employees"
    });
  }
};


export const deleteEmployee = async (req, res) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id);

    if (!employee) {
      return res.status(404).send({
        success: false,
        message: "Employee not found"
      });
    }

    await employee.deleteOne();

    return res.status(200).send({
      success: true,
      message: "Employee deleted successfully"
    });

  } catch (error) {
   
    return res.status(500).send({
      success: false,
      message: "Error in deleting employee"
    });
  }
};