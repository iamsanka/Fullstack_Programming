//Defining and array
const nos=[1,2,3,4,5,6,7,8,9,10,11];
oddNoArray(nos)
//Showing the array on console
console.log("Original array : "+nos)



//Creating function to get the odd no's
function oddNoArray(params){
    //Declaring odd array to input values
    let oddarr=[];
    //cheking each value is odd or even
    for(i=0; i<params.length; i++){
        if((params[i]/2)%1){
            oddarr.push(params[i])
        }
    }

    console.log("Odd Array is : "+oddarr);
}

