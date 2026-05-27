import { todo } from "./todo.js";

// console.log(test_message);

const callCarRepair = new todo("Call car repair", "Call dealership to do oil change", "January 10, 2027", "Low",
    `This is the half-yearly service`);

console.log(callCarRepair);

console.log(callCarRepair.description);