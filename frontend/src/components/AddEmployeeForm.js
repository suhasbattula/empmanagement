import React, { useState } from "react";
import axios from "../api";

function AddEmployeeForm({ onClose }) {
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
      setFormData({
        name: "",
        employeeID: "",
        email: "",
        phone: "",
        department: "",
        dateOfJoining: "",
        role: "",
      });
    } catch (err) {
      setError(err.response?.data?.error || "Error adding employee.");
      setSuccess("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Add Employee</h2>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="employeeID"
          placeholder="Employee ID"
          maxLength="10"
          value={formData.employeeID}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone Number"
          maxLength="10"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
        >
          <option value="">Select Department</option>
          <option value="HR">HR</option>
          <option value="Engineering">Engineering</option>
          <option value="Marketing">Marketing</option>
        </select>
        <input
          name="dateOfJoining"
          type="date"
          value={formData.dateOfJoining}
          onChange={handleChange}
          required
        />
        <input
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </form>
      <button onClick={onClose} style={{ marginTop: "10px" }}>
        Close Form
      </button>
    </div>
  );
}

export default AddEmployeeForm;
