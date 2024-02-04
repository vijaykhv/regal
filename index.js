const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware

const app = express();
const PORT = process.env.PORT || 3000;

// Add the cors middleware
app.use(cors());

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0208',
  database: 'liquorstore'
});

// Connect to MySQL
connection.connect(error => {
  if (error) {
    console.error('Error connecting to MySQL:', error);
    return;
  }
  console.log('Connected to MySQL');
});

// Middleware for parsing JSON requests
app.use(bodyParser.json());

// API endpoint for adding a new bottle
app.post('/api/add', (req, res) => {
  const { name, location } = req.body;

  // Execute the INSERT query
  connection.query(
    'INSERT INTO bottles (name, location) VALUES (?, ?)',
    [name, location],
    (error, results) => {
      if (error) {
        console.error('Error executing MySQL query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      res.status(201).json({ message: 'Bottle added successfully' });
    }
  );
});

// API endpoint for searching bottles
app.get('/api/search', (req, res) => {
  const { query } = req.query;

  // Execute the SELECT query
  connection.query(
    'SELECT * FROM bottles WHERE name LIKE ?',
    [`%${query}%`],
    (error, results) => {
      if (error) {
        console.error('Error executing MySQL query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      res.json(results);
    }
  );
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
