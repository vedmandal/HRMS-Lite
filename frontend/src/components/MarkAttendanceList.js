import { useState } from "react";
import API from "../api/Api";

const MarkAttendance = ({ employeeId }) => {
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");

  const submit = async () => {
    const res = await API.post("/attendance/mark-attendance", {
      employeeId,
      date,
      status
    });

    alert(res.data.message);

    if (res.data.success) {
      window.location.reload();
    }
  };

  return (
    <div className="inline">
      <input type="date" value={date}
        onChange={(e) => setDate(e.target.value)} />

      <select value={status}
        onChange={(e) => setStatus(e.target.value)}>
        <option>Present</option>
        <option>Absent</option>
      </select>

      <button onClick={submit}>Mark</button>
    </div>
  );
};

export default MarkAttendance;