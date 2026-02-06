import { useEffect, useState } from "react";
import API from "../api/Api";
import toast from "react-hot-toast";

const AttendanceList = ({ employeeId, refresh }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAttendance = async () => {
    try {
      setLoading(true);

      const res = await API.get(
        `/attendance/get-attendance/${employeeId}`
      );

      if (res.data.success) {
        setRecords(res.data.records);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch attendance");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (employeeId) {
      getAttendance();
    }
    // eslint-disable-next-line
  }, [employeeId, refresh]);

  useEffect(() => {
    getAttendance();
     // eslint-disable-next-line
  }, [employeeId, refresh]);

  if (loading) return <p>Loading attendance...</p>;

  if (records.length === 0) {
    return <p>No attendance records</p>;
  }

  return (
    <ul>
      {records.map((r) => (
        <li key={r._id}>
          {r.date} — {r.status}
        </li>
      ))}
    </ul>
  );
};

export default AttendanceList;