function highestNo (num1, num2, num3){
    let maxNo;
    if(num1>num2){
        if(num1>num3){
            maxNo=num1
        }else{
            maxNo=num3
        }
    }else{
        if(num2>num3){
            maxNo=num2
        }else{
            maxNo=num3
        }
    }

    let result=document.getElementById("output");
    result.innerHTML=maxNo;

}