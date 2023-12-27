//creating a person class with constructor including properties of the person class
class person{
    constructor(name, age, phone, email){
        this.name=name;
        this.age=age;
        this.phone=phone;
        this.email;
    }
    //method to increase the age by 1
    incAge(){
        this.age++;
    }
}

//creating new instances of the person class
let person1=new person("Sanka", 31, "0445678978","sanka@gmail.com");
let person2=new person("Ujwal", 21, "0445678345", "ujwal@gmail.com");
let person3=new person("Bhagya", 27, "0443451234", "Bhagya@gmail.com");

//calling the person1 intance 
console.log(person1.name);
console.log(person1.age);
person1.incAge();
console.log("age after calling the incAge method :"+person1.age);
person1.incAge();
console.log("age after calling the incAge method again: "+person1.age);

//calling the person1 intance 
console.log(person2.name);
console.log(person2.age);
person2.incAge();
console.log("age after calling the incAge method :"+person2.age);
person2.incAge();
console.log("age after calling the incAge method again: "+person2.age);