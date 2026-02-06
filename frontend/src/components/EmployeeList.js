import { useEffect, useState } from "react";
import API from "../api/Api";
import MarkAttendance from "./MarkAttendanceList";
import AttendanceList from "./AttendanceList";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    API.get("/employee/get-employees").then((res) => {
      if (res.data.success) {
        setEmployees(res.data.employees);
      }
    });
  }, []);

  const remove = async (id) => {
    if (!window.confirm("Delete employee?")) return;

    const res = await API.delete(`/employee/delete-employee/${id}`);
    alert(res.data.message);

    if (res.data.success) {
      setEmployees(employees.filter((e) => e._id !== id));
    }
  };

  return (
    <>
      <h2>Employees</h2>

      {employees.length === 0 && <p>No employees found</p>}

      {employees.map((emp) => (
        <div className="card" key={emp._id}>
          <h3>{emp.fullName}</h3>
          <p>{emp.employeeId} | {emp.department}</p>

          <button onClick={() => remove(emp._id)}>Delete</button>

          <MarkAttendance employeeId={emp._id} />
          <AttendanceList employeeId={emp._id} />
        </div>
      ))}
    </>
  );
};

export default EmployeeList;