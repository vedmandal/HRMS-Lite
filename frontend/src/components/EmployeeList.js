import { useEffect, useState } from "react";
import API from "../api/Api";
import toast from "react-hot-toast";
import AddEmployee from "./AddEmployee";
import MarkAttendance from "./MarkAttendanceList";
import AttendanceList from "./AttendanceList";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [refreshAttendance, setRefreshAttendance] = useState(false);

  const getAllEmployees = async () => {
    try {
      const res = await API.get("/employee/get-employees");
      if (res.data.success) setEmployees(res.data.employees);
    } catch {
      toast.error("Failed to fetch employees");
    }
  };

  const deleteEmployee = async (id) => {
    if (!window.confirm("Delete this employee and all their records?")) return;
    try {
      const res = await API.delete(`/employee/delete-employee/${id}`);
      if (res.data.success) {
        toast.success(res.data.message);
        getAllEmployees();
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    getAllEmployees();
  }, []);

  return (
    <div className="container">
    
      <AddEmployee onEmployeeAdded={getAllEmployees} />

      <h2 className="section-title">Team Directory</h2>

      {employees.length === 0 && (
        <p style={{ textAlign: "center", color: "#94a3b8" }}>No employees found.</p>
      )}

   
      <div className="list-wrapper">
        {employees.map((emp) => (
          <div className="card" key={emp._id} style={{ maxWidth: '600px' }}>
           
<div className="card-header">
  <div className="emp-info">
    <h3>{emp.fullName}</h3>
    <p>ID: <strong>{emp.employeeId}</strong> | {emp.department}</p>
  </div>
  
 
  <button 
    className="btn-small btn-danger" 
    onClick={() => deleteEmployee(emp._id)}
  >
    Delete
  </button>
</div>

            <div className="attendance-section">
            
              <MarkAttendance
                employeeId={emp._id}
                onAttendanceMarked={() => setRefreshAttendance(!refreshAttendance)}
              />

             
              <AttendanceList
                employeeId={emp._id}
                refresh={refreshAttendance}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;