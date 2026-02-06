import { useState } from "react";
import API from "../api/Api";
import toast from "react-hot-toast";

const AddEmployee = ({ onEmployeeAdded }) => {
  const [data, setData] = useState({
    employeeId: "", fullName: "", email: "", department: ""
  });
  const [loading, setLoading] = useState(false);

  // Field configuration for cleaner JSX
  const fields = [
    { name: "employeeId", placeholder: "Employee ID", type: "text" },
    { name: "fullName", placeholder: "Full Name", type: "text" },
    { name: "email", placeholder: "Email Address", type: "email" },
    { name: "department", placeholder: "Department", type: "text" },
  ];

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/employee/add-employee", data);
      if (res.data.success) {
        toast.success(res.data.message);
        setData({ employeeId: "", fullName: "", email: "", department: "" });
        onEmployeeAdded(); 
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="card" onSubmit={submit}>
      <h2>Add New Employee</h2>
      
      {fields.map((f) => (
        <input
          key={f.name}
          name={f.name}
          type={f.type}
          placeholder={f.placeholder}
          value={data[f.name]}
          onChange={handleChange}
          required
        />
      ))}

      <button disabled={loading}>
        {loading ? "Processing..." : "Register Employee"}
      </button>
    </form>
  );
};

export default AddEmployee;