import { useState } from "react";
import API from "../api/Api";

const AddEmployee = () => {
  const [data, setData] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    department: ""
  });

  const submit = async (e) => {
    e.preventDefault();

    const res = await API.post("/employee/add-employee", data);

    alert(res.data.message);

    if (res.data.success) {
      setData({ employeeId: "", fullName: "", email: "", department: "" });
      window.location.reload();
    }
  };

  return (
    <form className="card" onSubmit={submit}>
      <h2>Add Employee</h2>

      <input placeholder="Employee ID"
        value={data.employeeId}
        onChange={(e) => setData({ ...data, employeeId: e.target.value })}
        required />

      <input placeholder="Full Name"
        value={data.fullName}
        onChange={(e) => setData({ ...data, fullName: e.target.value })}
        required />

      <input placeholder="Email"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
        required />

      <input placeholder="Department"
        value={data.department}
        onChange={(e) => setData({ ...data, department: e.target.value })}
        required />

      <button>Add</button>
    </form>
  );
};

export default AddEmployee;