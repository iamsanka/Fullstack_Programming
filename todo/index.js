const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const notifier = require("node-notifier"); //library to get send notifications

const app = express();
const port = 3000;

//mongodb connection
mongoose.connect(
  "mongodb+srv://weatherapp:weatherapp@weatherapp.vcorcua.mongodb.net/",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

//directing public folder
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

//mongo db data model
const taskSchema = new mongoose.Schema({
  description: String,
  dueDate: { type: Date, index: true }, // Add index to duedate field to make data searh faster
  priority: { type: String, enum: ['high', 'medium', 'low'] }, // Add priority field
  date: { type: Date, default: Date.now },
});

const Task = mongoose.model("Task", taskSchema);

// Function to group tasks by due date
function groupTasksByDueDate(tasks) {
  const groupedTasks = [];
  tasks.forEach((task) => {
    const dueDateKey = task.dueDate
      ? task.dueDate.toDateString()
      : "No Due Date";
    const existingGroup = groupedTasks.find(
      (group) => group.dueDate === dueDateKey
    );

    if (existingGroup) {
      existingGroup.tasks.push(task);
    } else {
      groupedTasks.push({
        dueDate: dueDateKey,
        tasks: [task],
      });
    }
  });

  return groupedTasks;
}




// Middleware to check for due tasks and send notifications
app.use(async (req, res, next) => {
  const now = new Date();
  const dueTasks = await Task.find({ dueDate: { $lte: now } });

  dueTasks.forEach((task) => {
    sendNotification("Task Due", `Your task "${task.description}" is due now!`);
  });

  next();
});

// Routes
app.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ dueDate: 1 }); // Sort tasks by due date
    const groupedTasks = groupTasksByDueDate(tasks);
    res.render("index", { tasks: groupedTasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post('/add', async (req, res) => {
  const newTask = new Task({
    description: req.body.description,
    dueDate: req.body.dueDate,
    priority: req.body.priority,
  });
  await newTask.save();
  console.log(`Task with ID ${newTask._id} saved successfully.`);
  sendNotification('Task Added', `New task added: ${newTask.description}`);
  res.redirect('/');
});

app.post("/update/:id", async (req, res) => {
  try {
    await Task.findByIdAndUpdate(req.params.id, {
      description: req.body.description,
      dueDate: req.body.dueDate,
      priority: req.body.priority,
    });

    console.log(`Task with ID ${req.params.id} updated successfully.`);
    sendNotification("Task Updated", `Task updated: ${req.body.description}`);
    res.redirect("/");
  } catch (error) {
    console.error(`Error updating task with ID ${req.params.id}:`, error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/delete/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  //cheking the db connection for delete
  console.log(`Task with ID ${req.params.id} deleted successfully.`);
  res.redirect("/");
});

app.get("/search", async (req, res) => {
  try {
    const searchQuery = req.query.search;
    const tasks = await Task.find({
      description: { $regex: searchQuery, $options: "i" },
    }).sort({ dueDate: 1 }); // Sort tasks by due date

    const groupedTasks = groupTasksByDueDate(tasks);
    res.render("index", { tasks: groupedTasks });
  } catch (error) {
    console.error("Error searching tasks:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Function to send desktop notifications using node-notifier
function sendNotification(title, message) {
  notifier.notify({
    title: title,
    message: message,
  });
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
