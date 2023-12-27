//importing file system module
const fs=require('fs');

//read the content of the text file
fs.readFile('no.txt', 'utf8', (err, data)=>{
    if(err){
        console.error('Error reading the file:', err);
        return;
    }

    //splitting the data into an array 
    const numbers=data.split(',').map(Number);

    //calculating the sum
    const sum=numbers.reduce((acc, current)=> acc+ current, 0);

    //Print the result to the console
    console.log('Numbers: ', numbers.join(', '));
    console.log('Sum: ', sum);
});
