const myFunctionWithCallback = (p1, p2, callback) => {
    console.log("1");
    return callback(p1, p2)
    console.log("2");
}
console.log("3");
  const myFunc = (p1, p2) => `Pizza with ${p1} and ${p2}`
  console.log("4");
  const result = myFunctionWithCallback('ham', 'cheese', myFunc)
  console.log("5");
  console.log(result)
  console.log("6");


//the program starts with line no 5 and 'myFunc' Functions goes with 2 parameters
//Then the program goes to line no 6 and call the 'myFunctionWithCallback' 
//For the myFunctionWithCallback Function has 3 parameters 
//then the program executes the no 1 line and goes in to 'myFunctionWithCallback' function and execute no 2 line
//then it will callback the 'myFunk' and assign the value to 'result' variable
//Finally the no 7 will be executed and the sentence shows in the console