import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import mysql from 'mysql2';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MySQL database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.log('Error connecting to database: ', err);
    return;
  }
  console.log('Connected to database');
});

// Input sanitization middleware
const sanitizeInput = (req, res, next) => {
  const { name, email, contact, password } = req.body;

  // For the /register route
  if (req.path === '/register') {
    if (!name || !email || !contact || !password) {
      return res.status(400).send('All fields are required.');
    }
    req.body.name = name.trim();
    req.body.email = email.trim();
    req.body.contact = contact.trim();
    req.body.password = password.trim();
  }

  // For the /login route
  if (req.path === '/login') {
    if (!email || !password) {
      return res.status(400).send('Email and password are required.');
    }
    req.body.email = email.trim();
    req.body.password = password.trim();
  }

  next();
};

// Register route
app.post('/register', sanitizeInput, async (req, res) => {
  const { name, email, contact, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    const query =
      'INSERT INTO users (name, email, contact, password) VALUES (?, ?, ?, ?)';
    db.query(query, [name, email, contact, hashedPassword], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).send('Email already exists.');
        }
        console.error('Error inserting user into the database:', err);
        return res.status(500).send('Internal server error.');
      }
      res.status(201).send('User registered successfully.');
    });
  } catch (err) {
    console.error('Error hashing password:', err);
    res.status(500).send('Internal server error.');
  }
});

// Login route
app.post('/login', sanitizeInput, async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async (err, results) => {
      if (err) {
        console.error('Error querying the database:', err);
        return res.status(500).send('Internal server error.');
      }

      if (results.length === 0) {
        return res.status(400).send('Invalid email or password.');
      }

      const user = results[0];

      // Compare the provided password with the hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send('Invalid email or password.');
      }

      // If login is successful, send a success response
      res.status(200).send('Login successful.');
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).send('Internal server error.');
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});