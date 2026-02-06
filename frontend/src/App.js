
import EmployeeList from "./components/EmployeeList";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="container">
         <Toaster position="top-right" reverseOrder={false} />
      <h1>HRMS Lite</h1>
     
      <EmployeeList />
    </div>
  );
}

export default App;