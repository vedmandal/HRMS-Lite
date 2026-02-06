import { useEffect, useState } from "react";
import API from "../api/Api";

const AttendanceList = ({ employeeId }) => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    API.get(`/attendance/get-attendance/${employeeId}`)
      .then((res) => {
        if (res.data.success) {
          setRecords(res.data.records);
        }
      });
  }, [employeeId]);

  return (
    <ul>
      {records.map((r) => (
        <li key={r._id}>
          {r.date} - {r.status}
        </li>
      ))}
    </ul>
  );
};

export default AttendanceList;