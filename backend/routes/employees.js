const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});


router.post("/", async (req, res) => {
  const { name, employeeID, email, phone, department, dateOfJoining, role } = req.body;

  try {
   
    const checkQuery = "SELECT * FROM employees WHERE employee_id = $1 OR email = $2";
    const existing = await pool.query(checkQuery, [employeeID, email]);

    if (existing.rows.length > 0) {
      return res.status(400).json({ error: "Employee ID or Email already exists" });
    }

    const query = `
      INSERT INTO employees (name, employee_id, email, phone, department, date_of_joining, role)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
    const newEmployee = await pool.query(query, [name, employeeID, email, phone, department, dateOfJoining, role]);

    res.status(201).json(newEmployee.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM employees");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
