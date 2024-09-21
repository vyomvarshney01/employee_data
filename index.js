const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;
const cors = require('cors');

const { getAllEmployees, getEmployeesById } = require('./controllers');
app.use(cors());
app.use(express.json());

// Endpoint to get all employees
app.get('/employees', async (req, res) => {
  try {
    const employees = getAllEmployees();
    if (employees.length === 0) {
      res.status(400).json('No employee details found');
    }
    res.status(200).json({ employees });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to get employee detalls by id
app.get('/employees/details/:id', async (req, res) => {
  try {
    let employee = getEmployeesById(parseInt(req.params.id));
    if (employee.length === 0) {
      res.status(400).json('No employee detail found by this id');
    }
    res.status(200).json({
      employee,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { app };
