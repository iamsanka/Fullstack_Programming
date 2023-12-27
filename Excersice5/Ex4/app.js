const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

let requestCounter = 0;

// Middleware to increment the request counter and save it to a text file
app.use((req, res, next) => {
  requestCounter++;
  fs.writeFileSync('requestCounter.txt', requestCounter.toString());
  next();
});

// Serve the HTML page and send the request counter
app.get('/requestCounter', (req, res) => {
  //res.sendFile(__dirname + '/index.html');
  res.json({ requestCounter });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
