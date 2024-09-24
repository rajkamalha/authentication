import React, { useState } from "react";
import axios from "axios";

function LoginPage () {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [error, setError] = useState(""); 
  const [dashboardMessage, setDashboardMessage] = useState(""); 

  const handleLogin = async (e) => {
    e.preventDefault(); 

    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });

      // Save the token to localStorage
      localStorage.setItem("token", response.data.token);
      setIsLoggedIn(true);
      setError("");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:5000/dashboard", {
        headers: {
          Authorization: token,
        },
      });

      setDashboardMessage(response.data.message); 
    } catch (err) {
      setDashboardMessage("Error fetching dashboard");
    }
  };
return (
    <div>
      {!isLoggedIn ? (
        <form onSubmit={handleLogin}>
          <div>
            <label>Username: </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Password: </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      ) : (
        <div>
          <h2>Welcome, {username}!</h2>
          <button onClick={fetchDashboard}>Go to Dashboard</button>
          {dashboardMessage && <p>{dashboardMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default LoginPage;