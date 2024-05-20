import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook to navigate between routes

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', {
        username,
        password
      });
      navigate('/home', { state: { message: `Hello ${response.data}` } }); // Navigate to Home on success
    } catch (error) {
      alert('Login Failed: ' + (error.response ? error.response.data : "Network error"));
    }
  };

  return (
    <div className="App-header">
      <img src="https://pbs.twimg.com/card_img/1785986646485389312/7kkD4GNo?format=png&name=small" className="App-logo" alt="logo" />
      <p>Sign in to GitHub</p>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

function Home() {
  const location = useLocation(); // Hook to access the state passed via navigate
  
  // Default message in case state is undefined
  const message = location.state ? location.state.message : "Welcome!";

  return (
    <div className="home">
      <header className="home-header">
        <h1>{message}</h1>
        <p>Welcome to your Kubernetes Dashboard</p>
      </header>
      <section className="content">
<p>This is your main area where you can manage your Kubernetes deployments, view statistics, and access system updates.</p>
 </section>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
