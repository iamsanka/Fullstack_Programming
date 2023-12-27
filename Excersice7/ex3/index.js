const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');

// Connection to MongoDB
const mongoDB = 'YOUR_MONGODB_CONNECTION_STRING';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Database connected');
});

// Mongoose Schema
const userSchema = new mongoose.Schema({
  name: String,
});

// Mongoose Model
const User = mongoose.model('User', userSchema, 'users');

// Middleware
app.use(express.json());

// POST route
app.post('/users', async (request, response) => {
  const { name } = request.body;

  const user = new User({
    name: name,
  });

  try {
    const savedUser = await user.save();
    response.json(savedUser);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

// GET route
app.get('/users', async (request, response) => {
  try {
    const users = await User.find({});
    response.json(users);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

// GET one user route
app.get('/users/:id', async (request, response) => {
  try {
    const user = await User.findById(request.params.id);
    if (user) response.json(user);
    else response.status(404).end();
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

// DELETE route
app.delete('/users/:id', async (request, response) => {
  try {
    const deletedUser = await User.findByIdAndRemove(request.params.id);
    if (deletedUser) response.json(deletedUser);
    else response.status(404).end();
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
