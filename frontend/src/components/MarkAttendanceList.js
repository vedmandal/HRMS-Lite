import { useState } from "react";
import API from "../api/Api";
import toast from "react-hot-toast";

const MarkAttendance = ({ employeeId, onAttendanceMarked }) => {
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!date) return toast.error("Please select a date");

    setLoading(true);
    try {
      const res = await API.post("/attendance/mark-attendance", {
        employeeId,
        date,
        status
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setDate("");
        setStatus("Present");
        onAttendanceMarked(); 
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to mark attendance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="attendance-actions">
      <input
        type="date"
        className="input-small"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <select
        className="select-small"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
      </select>

      <button 
        className="btn-mark" 
        onClick={submit} 
        disabled={loading}
      >
        {loading ? "..." : "Mark Attendance"}
      </button>
    </div>
  );
};

export default MarkAttendance;