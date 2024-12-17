import React, { useState } from "react";
import axios from "../api";

function AddEmployeeForm() {
  const [formData, setFormData] = useState({
    name: "",
    employeeID: "",
    email: "",
    phone: "",
    department: "",
    dateOfJoining: "",
    role: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/employees", formData);
      setSuccess("Employee added successfully!");
      setError("");
    } catch (err) {
      setError(err.response.data.error || "Error adding employee.");
      setSuccess("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Employee</h2>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="employeeID" placeholder="Employee ID" maxLength="10" onChange={handleChange} required />
      <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
      <input name="phone" placeholder="Phone Number" maxLength="10" onChange={handleChange} required />
      <select name="department" onChange={handleChange} required>
        <option value="">Select Department</option>
        <option value="HR">HR</option>
        <option value="Engineering">Engineering</option>
        <option value="Marketing">Marketing</option>
      </select>
      <input name="dateOfJoining" type="date" onChange={handleChange} required />
      <input name="role" placeholder="Role" onChange={handleChange} required />
      <button type="submit">Submit</button>
      {error && <p>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </form>
  );
}

export default AddEmployeeForm;
