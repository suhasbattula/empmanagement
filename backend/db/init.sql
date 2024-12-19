CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    employee_id VARCHAR(255),
    phone VARCHAR(20),
    department VARCHAR(100),
    date_of_joining DATE,
    role VARCHAR(100),
    email VARCHAR(255)
);
