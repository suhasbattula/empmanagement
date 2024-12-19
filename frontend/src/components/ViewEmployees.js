import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    employee_id: "",
    email: "",
    phone: "",
    department: "",
    date_of_joining: "",
    role: "",
  });

  // Fetch employees
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios
      .get("http://localhost:5000/api/employees")
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error("Error fetching employees:", error));
  };

  // Handle Delete
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/employees/${id}`)
      .then(() => fetchEmployees())
      .catch((error) => console.error("Error deleting employee:", error));
  };

  // Handle Edit
  const handleEdit = (employee) => {
    setEditingEmployee(employee.id);
    setFormData(employee);
  };

  const handleEditChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    axios
      .put(`http://localhost:5000/api/employees/${editingEmployee}`, formData)
      .then(() => {
        setEditingEmployee(null);
        fetchEmployees();
      })
      .catch((error) => console.error("Error updating employee:", error));
  };

  return (
    <div className="modal">
      <h2>Employee List</h2>
      <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Department</th>
            <th>Date of Joining</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              {editingEmployee === emp.id ? (
                <>
                  <td>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      name="employee_id"
                      value={formData.employee_id}
                      onChange={handleEditChange}
                      disabled
                    />
                  </td>
                  <td>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      name="department"
                      value={formData.department}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      name="date_of_joining"
                      value={formData.date_of_joining}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      name="role"
                      value={formData.role}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setEditingEmployee(null)}>
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{emp.name}</td>
                  <td>{emp.employee_id}</td>
                  <td>{emp.email}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.department}</td>
                  <td>{new Date(emp.date_of_joining).toLocaleDateString()}</td>
                  <td>{emp.role}</td>
                  <td>
                    <button onClick={() => handleEdit(emp)}>Edit</button>
                    <button onClick={() => handleDelete(emp.id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewEmployees;
