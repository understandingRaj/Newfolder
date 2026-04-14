// Base class
class Vehicle {
 constructor(brand) {
   this.brand = brand;
 }
 start() {
   console.log(`${this.brand} is starting...`);
 }
}
// Derived class
class Car extends Vehicle {
 constructor(brand, model) {
   super(brand); // Call parent constructor
   this.model = model;
 }
 start() {
   console.log(`${this.brand} ${this.model} is starting with a roar!`);
 }
}
const car1 = new Car("Toyota", "Corolla");
car1.start(); // Toyota Corolla is starting with a roar!


async function loadUsers() {
  let res = await fetch("https://jsonplaceholder.typicode.com/users");
  let users = await res.json();
  console.log(users)


  let output = "";
  users.forEach(user => {
    output += `<li>${user.name}</li>`;
  });

  document.getElementById("list").innerHTML = output;
}
loadUsers()