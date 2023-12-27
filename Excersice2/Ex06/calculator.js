class speedCalculator{
    constructor(hrs, mins, secs, kms){
        this.hrs=hrs;
        this.mins=mins;
        this.secs=secs;
        this.kms=kms;
    }
    calcKmhPace(){
        let totalhrs=(this.hrs)+((this.mins)/60)+((this.secs)/3600);
        let speed=this.kms/totalhrs;
        return speed;
        

    }
}

function kmhpace(){
    //Program Starts here
    //getting the values of th einput field
    const hours=parseFloat(document.getElementById('hrsInp').value);
    const minutes=parseFloat(document.getElementById('minsInp').value);
    const seconds=parseFloat(document.getElementById('secsInp').value);
    const kilometers=parseFloat(document.getElementById('kmsInp').value);

    //Create an instance of the class and passing the given values as the parameter
    const calculator=new speedCalculator(hours, minutes, seconds, kilometers);
    //getting the speed and converting it to float value
    const kmspeed=calculator.calcKmhPace().toFixed(2);

    //assigning the value to the p tag in the form
    const resultElement = document.getElementById('result');
    resultElement.textContent = `Speed: ${kmspeed} km/h`;
}
