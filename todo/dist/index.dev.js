"use strict";

var express = require("express");

var mongoose = require("mongoose");

var bodyParser = require("body-parser");

var notifier = require("node-notifier"); //library to get send notifications


var app = express();
var port = 3000; //mongodb connection

mongoose.connect("mongodb+srv://weatherapp:weatherapp@weatherapp.vcorcua.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); //directing public folder

app.use(express["static"](__dirname + "/public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set("view engine", "ejs");
app.use(express["static"]("public")); //mongo db data model

var taskSchema = new mongoose.Schema({
  description: String,
  dueDate: {
    type: Date,
    index: true
  },
  // Add index to duedate field to make data searh faster
  priority: {
    type: String,
    "enum": ['high', 'medium', 'low']
  },
  // Add priority field
  date: {
    type: Date,
    "default": Date.now
  }
});
var Task = mongoose.model("Task", taskSchema); // Function to group tasks by due date

function groupTasksByDueDate(tasks) {
  var groupedTasks = [];
  tasks.forEach(function (task) {
    var dueDateKey = task.dueDate ? task.dueDate.toDateString() : "No Due Date";
    var existingGroup = groupedTasks.find(function (group) {
      return group.dueDate === dueDateKey;
    });

    if (existingGroup) {
      existingGroup.tasks.push(task);
    } else {
      groupedTasks.push({
        dueDate: dueDateKey,
        tasks: [task]
      });
    }
  });
  return groupedTasks;
} // Middleware to check for due tasks and send notifications


app.use(function _callee(req, res, next) {
  var now, dueTasks;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          now = new Date();
          _context.next = 3;
          return regeneratorRuntime.awrap(Task.find({
            dueDate: {
              $lte: now
            }
          }));

        case 3:
          dueTasks = _context.sent;
          dueTasks.forEach(function (task) {
            sendNotification("Task Due", "Your task \"".concat(task.description, "\" is due now!"));
          });
          next();

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}); // Routes

app.get("/", function _callee2(req, res) {
  var tasks, groupedTasks;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Task.find().sort({
            dueDate: 1
          }));

        case 3:
          tasks = _context2.sent;
          // Sort tasks by due date
          groupedTasks = groupTasksByDueDate(tasks);
          res.render("index", {
            tasks: groupedTasks
          });
          _context2.next = 12;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.error("Error fetching tasks:", _context2.t0);
          res.status(500).send("Internal Server Error");

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
app.post('/add', function _callee3(req, res) {
  var newTask;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          newTask = new Task({
            description: req.body.description,
            dueDate: req.body.dueDate,
            priority: req.body.priority
          });
          _context3.next = 3;
          return regeneratorRuntime.awrap(newTask.save());

        case 3:
          console.log("Task with ID ".concat(newTask._id, " saved successfully."));
          sendNotification('Task Added', "New task added: ".concat(newTask.description));
          res.redirect('/');

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
});
app.post("/update/:id", function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Task.findByIdAndUpdate(req.params.id, {
            description: req.body.description,
            dueDate: req.body.dueDate,
            priority: req.body.priority
          }));

        case 3:
          console.log("Task with ID ".concat(req.params.id, " updated successfully."));
          sendNotification("Task Updated", "Task updated: ".concat(req.body.description));
          res.redirect("/");
          _context4.next = 12;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          console.error("Error updating task with ID ".concat(req.params.id, ":"), _context4.t0);
          res.status(500).send("Internal Server Error");

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
app.get("/delete/:id", function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Task.findByIdAndDelete(req.params.id));

        case 2:
          //cheking the db connection for delete
          console.log("Task with ID ".concat(req.params.id, " deleted successfully."));
          res.redirect("/");

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
});
app.get("/search", function _callee6(req, res) {
  var searchQuery, tasks, groupedTasks;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          searchQuery = req.query.search;
          _context6.next = 4;
          return regeneratorRuntime.awrap(Task.find({
            description: {
              $regex: searchQuery,
              $options: "i"
            }
          }).sort({
            dueDate: 1
          }));

        case 4:
          tasks = _context6.sent;
          // Sort tasks by due date
          groupedTasks = groupTasksByDueDate(tasks);
          res.render("index", {
            tasks: groupedTasks
          });
          _context6.next = 13;
          break;

        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](0);
          console.error("Error searching tasks:", _context6.t0);
          res.status(500).send("Internal Server Error");

        case 13:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 9]]);
}); // Function to send desktop notifications using node-notifier

function sendNotification(title, message) {
  notifier.notify({
    title: title,
    message: message
  });
}

app.listen(port, function () {
  console.log("Server is running on http://localhost:".concat(port));
});