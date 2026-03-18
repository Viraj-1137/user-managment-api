const express = require('express');
const app = express();

app.use(express.json()); // to read JSON data

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

let users = [
  { id: 1, name: "Rahul", age: 22, email: "rahul@gmail.com" },
  { id: 2, name: "Amit", age: 17, email: "amit@gmail.com" }
];


app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});


app.post('/users', (req, res) => {
  const { name, age, email } = req.body;

  // validation
  if (!name || !age || !email) {
    return res.status(400).json({ message: "All fields required" });
  }

  const newUser = {
    id: users.length + 1,
    name,
    age,
    email
  };

  users.push(newUser);

  res.status(201).json(newUser);
});

app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);

  users = users.filter(u => u.id !== id);

  res.json({ message: "User deleted" });
});

app.get('/users/search', (req, res) => {
  const name = req.query.name;

  const result = users.filter(u =>
    u.name.toLowerCase().includes(name.toLowerCase())
  );

  res.json(result);
});

app.get('/users/adults', (req, res) => {
  const adults = users.filter(u => u.age >= 18);

  res.json(adults);
});

app.get('/users/emails', (req, res) => {
  const emails = users.map(u => u.email);

  res.json(emails);
});