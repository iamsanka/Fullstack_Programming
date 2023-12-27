let array=[11,22,33,44];
let sum = 0;
let count = 0;
let average;
let lines='';

//Using 'for of' loop get the sum of array
for (let arr of array){
    sum += arr;
}
console.log("Sum of the array is : "+sum);

//Using for loop to create lines of the array
for(i=0; i<array.length; i++){
    console.log("line["+i+"] = array["+i+"] = "+array[i]);
}

//Getting the element count in the array
count=array.length
console.log("Count="+count);

//Total of the array
console.log("Sum="+sum);

//Average of the values
average=sum/count;
console.log("Average="+average);