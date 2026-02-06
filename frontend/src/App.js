import AddEmployee from "./components/AddEmployee";
import EmployeeList from "./components/EmployeeList";

function App() {
  return (
    <div className="container">
      <h1>HRMS Lite</h1>
      <AddEmployee />
      <EmployeeList />
    </div>
  );
}

export default App;