import { Todo } from "./todo.js";
import { Project } from "./project.js";

// console.log(test_message);

const callCarRepair = new Todo("Call car repair", "Call dealership to do oil change", "January 10, 2027", "Low",
    `This is the half-yearly service`, false);

console.log(callCarRepair);

console.log(callCarRepair.description);

const lunchWithBob = new Todo("Schedule lunch with Bob", "Call Bob and the restaurant to set the time", 
    "January 10, 2027", "Medium", "Bob will be in town for business", true);


const afternoonTodos = new Project("Afternoon");

afternoonTodos.addTodo(callCarRepair);
afternoonTodos.addTodo(lunchWithBob);

console.log(afternoonTodos.todoList)

