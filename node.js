const express = require('express');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());

const users = []; // Temporary array for storing users

app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ name, email, password: hashedPassword });
  res.status(201).send('User created');
});

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  
  if (user && await bcrypt.compare(password, user.password)) {
    res.status(200).send('Login successful');
  } else {
    res.status(401).send('Invalid credentials');
  }
});

app.listen(3000, () => console.log('Server is running on port 3000'));