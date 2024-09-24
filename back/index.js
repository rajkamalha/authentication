const express = require("express")
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5000;
const SECRET_KEY = "jwt_secret_key"; 

app.use(cors());
app.use(bodyParser.json());

const users = {
  username: "user",
  password: "pass123",
};

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === users.username && password === users.password) {
    // Create JWT token
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });

    return res.status(200).json({ message: "Login successful", token });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

app.get("/dashboard", (req, res) => {
  const token = req.headers["authorization"];

  if (!token) return res.status(403).json({ message: "Token required" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    // Proceed if token is valid
    res.status(200).json({ message: `Welcome to the dashboard, ${decoded.username}`});
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on: ${PORT}`);
});
