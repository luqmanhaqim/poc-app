const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const port = 30002; // Adjust the port as necessary

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000' // Adjust this if your React app is on a different port
}));


// Predefined user details
let user_details = {
  luqmnhaqim: {
    name: "haqim",
    username: "luqmnhaqim",
    password: "12345",
    email: "haqim@gmail.com"
  }
};

// Login endpoint
app.post('/api/users/login', (req, res) => {
  const { username, password } = req.body;

  if (user_details[username]) {
    if (user_details[username].password === password) {
      res.send(`Welcome ${user_details[username].name}`);
      console.log(`Welcome ${user_details[username].name}`);
    } else {
      res.status(401).send('Password is incorrect');
    }
  } else {
    res.status(404).send('User not found. Please create an account.');
  }
});

app.get('/api/users/register/health', (req, res) => {
    res.send(`Welcome test user`);
    console.log("health check")
  });


app.get('/', (req, res) => {
    res.send(`Default entry point #conflict causer`);
    console.log("health check")
  });

// Register endpoint
app.post('/api/users/register', (req, res) => {
  const { name, username, password, email } = req.body;

  if (user_details[username]) {
    res.status(409).send('Username already exists');
  } else {
    user_details[username] = { name, username, password, email };
    res.send('User registered successfully');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
