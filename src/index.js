import { Todo } from "./todo.js";
import { Project } from "./project.js";
import "./styles.css"

// console.log(test_message);

// Todo.prototype.changeComplete = function() {
//     this.read = (this.read) ? false : true;
// }

function addTodoToProject(project, title, description, dueDate, priority, note, complete) {
  let todo = new Todo(crypto.randomUUID(), title, description, dueDate, priority, note, complete);
  project.addTodo(todo);
}

// const callCarRepair = new Todo(crypto.randomUUID(), "Call car repair", "Call dealership to do oil change", new Date(2018, 11, 24, 10, 33, 30),
//     "Low", `This is the half-yearly service`, false);

// console.log(callCarRepair);

// console.log(callCarRepair.description);

// const lunchWithBob = new Todo(crypto.randomUUID(), "Schedule lunch with Bob", "Call Bob and the restaurant to set the time", 
    // new Date(2018, 1, 24, 17, 53, 45), "Medium", "Bob will be in town for business", true);


const afternoonTodos = new Project(crypto.randomUUID(), "Afternoon");

addTodoToProject(afternoonTodos, "Call car repair", "Call dealership to do oil change", new Date(2018, 11, 24, 10, 33, 30),
     "Low", `This is the half-yearly service`, false);

addTodoToProject(afternoonTodos, "Schedule lunch with Bob", "Call Bob and the restaurant to set the time", 
     new Date(2018, 1, 24, 17, 53, 45), "Medium", "Bob will be in town for business", true);

// afternoonTodos.addTodo(callCarRepair);
// afternoonTodos.addTodo(lunchWithBob);

console.log(afternoonTodos.todoList)

