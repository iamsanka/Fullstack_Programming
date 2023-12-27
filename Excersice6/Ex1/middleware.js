// create logger middleware
const logger = (request, response, next) => {
    const date = new Date();
    const lDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    const log = `${lDate}: ${request.method} ${request.url}\n`;
    console.log(log);
  
    // Save the log to a file
  
    next();
  };
  
  module.exports = logger;
  