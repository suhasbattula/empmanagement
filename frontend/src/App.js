import React, { useState } from "react";
import AddEmployeeForm from "./components/AddEmployeeForm";
import ViewEmployees from "./components/ViewEmployees";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [showList, setShowList] = useState(false);

  return (
    <div className="app-container">
      <header className="header">
        <h1>Employee Management System</h1>
      </header>
      <div className="button-container">
        <button onClick={() => { setShowForm(true); setShowList(false); }}>Add Employee</button>
        <button onClick={() => { setShowList(true); setShowForm(false); }}>View Employees</button>
      </div>
      {showForm && <AddEmployeeForm />}
      {showList && <ViewEmployees />}
    </div>
  );
}

export default App;
