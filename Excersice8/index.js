const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

mongoose.connect('mongodb+srv://weatherapp:weatherapp@weatherapp.vcorcua.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.static(__dirname + '/public'));

const taskSchema = new mongoose.Schema({
  description: String,
  date: { type: Date, default: Date.now },
});

const Task = mongoose.model('Task', taskSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Routes
app.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.render('index', { tasks });
});

app.post('/add', async (req, res) => {
  const newTask = new Task({ description: req.body.description });
  await newTask.save();
  console.log(`Task with ID ${req.params.id} saved successfully.`);
  res.redirect('/');
});

app.post('/update/:id', async (req, res) => {
    await Task.findByIdAndUpdate(req.params.id, { description: req.body.description });
    console.log(`Task with ID ${req.params.id} updated successfully.`);
    res.redirect('/');
  });
  
  app.get('/delete/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    console.log(`Task with ID ${req.params.id} deleted successfully.`);
    res.redirect('/');
  });

app.get('/search', async (req, res) => {
  const searchQuery = req.query.search;
  const tasks = await Task.find({ description: { $regex: searchQuery, $options: 'i' } });
  res.render('index', { tasks });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
