<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
</head>
<body>
  <h1>secureWeb Application</h1>
  <p>This application is built using React (with Vite), Express.js, and MySQL. It includes features like user registration and login with secure password storage.</p>

  <h2>Steps to Set Up and Run the Application</h2>

  <h3>1. Clone the Repository</h3>
  <p>Clone the repository to your local machine:</p>
  <pre><code>git clone &lt;repository-url&gt;</code></pre>

  <h3>2. Install Dependencies</h3>
  <p>Navigate to the project directory and install the required dependencies for both the frontend and backend:</p>
  <pre><code>npm install</code></pre>

  <h3>3. Download and Install MySQL</h3>
  <ul>
    <li>Download and install MySQL from the <a href="https://dev.mysql.com/downloads/installer/" target="_blank">official website</a>.</li>
    <li>Set up a MySQL server and create a database for the application.</li>
  </ul>

  <h3>4. Create the <code>.env</code> File</h3>
  <p>Create a <code>.env</code> file in the root of the project to store your database credentials. Add the following variables:</p>
  <pre><code>
DB_HOST=localhost
DB_USER=&lt;your-mysql-username&gt;
DB_PASSWORD=&lt;your-mysql-password&gt;
DB_NAME=&lt;your-database-name&gt;
  </code></pre>

  <h3>5. Set Up the Database</h3>
  <p>Use MySQL Workbench or the MySQL CLI to create the database and <code>users</code> table. Run the following SQL commands:</p>
  <pre><code>
CREATE DATABASE secure_web;

USE secure_web;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    contact VARCHAR(10) NOT NULL,
    password VARCHAR(255) NOT NULL
);
  </code></pre>

  <h3>6. Run the Express Server</h3>
  <p>Start the backend server using Node.js:</p>
  <pre><code>node server.js</code></pre>
  <p>The server will run on <code>http://localhost:3000</code> by default.</p>

  <h3>7. Run the React Development Environment</h3>
  <p>Start the React frontend development server:</p>
  <pre><code>npm run dev</code></pre>
  <p>The frontend will run on <code>http://localhost:5173</code> by default.</p>

  <h3>8. Work Around with the App Features</h3>
  <p>Once both the backend and frontend servers are running:</p>
  <ul>
    <li>Open the app in your browser at <code>http://localhost:5173</code>.</li>
    <li>Use the <strong>Register</strong> feature to create a new user.</li>
    <li>Use the <strong>Login</strong> feature to authenticate and access the user dashboard.</li>
  </ul>

  <h2>Features</h2>
  <ul>
    <li><strong>User Registration:</strong> Securely register users with hashed passwords.</li>
    <li><strong>User Login:</strong> Authenticate users and redirect them to a user-specific dashboard.</li>
    <li><strong>MySQL Integration:</strong> Store user data in a MySQL database.</li>
  </ul>

  <p>Feel free to explore and modify the application as needed!</p>
</body>
</html>
