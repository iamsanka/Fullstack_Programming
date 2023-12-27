//set initial counter
let count=0
//set interval for the counetr function to be called
let intId = setInterval(counter, 1000);

function counter(){
    //setting the 'fireword' variable with the p tag id's
    let fireword="firework"+count;
    if(count<4){
        //showing the sentence in the web page
        document.getElementById(fireword).innerHTML="NICE-Fireworks!!!";
        count=++count;
        console.log(count);
    }else{
        //when the 'count=4' stop th ecallback and finish the program with the final sentence
        clearInterval(count);
        document.getElementById(fireword).innerHTML="WOW-that is the best concert in my life...";
    }
}
