function calculateNo(num1, num2){
    let tot;
    //pasing the string value to int
    tot=parseInt(num1)+parseInt(num2);
    return tot;
}

function displaySum(num1, num2){
    //calling the calculateNo function
    let sum=calculateNo(num1, num2);
    let result=document.getElementById("result");
    result.innerHTML=("Sum is {$}",sum);
}