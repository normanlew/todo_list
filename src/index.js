import { Todo } from "./todo.js";
import { Project } from "./project.js";
import "./styles.css";

const all_projects = [];

function addTodoToProject(project, title, description, dueDate, priority, note, complete) {
  let todo = new Todo(crypto.randomUUID(), title, description, dueDate, priority, note, complete);
  project.addTodo(todo);
}

const button_new_project = document.querySelector("#new_project");

button_new_project.addEventListener("click", (event) => {
     console.log("new project button clicked");
     createNewProject(all_projects);
});

const afternoonTodos = new Project(crypto.randomUUID(), "Afternoon");

addTodoToProject(afternoonTodos, "Call car repair", "Call dealership to do oil change", new Date(2018, 11, 24, 10, 33, 30),
     "Low", `This is the half-yearly service`, false);

addTodoToProject(afternoonTodos, "Schedule lunch with Bob", "Call Bob and the restaurant to set the time", 
     new Date(2018, 1, 24, 17, 53, 45), "Medium", "Bob will be in town for business", true);

all_projects.push(afternoonTodos);
const projects = document.querySelector(".projects");

for (let project of all_projects) {
     let div_project = document.createElement("div");

     div_project.className = "project";
     // div_project.innerHTML = project.name;
     div_project.id = project.id;
     let div_project_name = document.createElement("div");
     div_project_name.className = "project_name";
     let h2_title = document.createElement("h2");
     h2_title.innerHTML = project.name;
     div_project_name.appendChild(h2_title);
     div_project.appendChild(div_project_name);

     for (let todo of project.todoList) {
          let div_todo_wrapper = document.createElement("div");

          div_todo_wrapper.className = "todo_wrapper";
          let div_todo = document.createElement("div");
          div_todo.className = "todo";
          let div_todo_title = document.createElement("div");
          div_todo_title.className = "todo_title"
          let p_title = document.createElement("p");
          p_title.innerHTML = todo.title;
          div_todo_title.appendChild(p_title);
          let div_todo_dueDate = document.createElement("div");
          div_todo_dueDate.className = "todo_dueDate";
          let p_dueDate = document.createElement("p");
          p_dueDate.innerHTML = todo.dueDate;
          div_todo_dueDate.appendChild(p_dueDate);
          div_todo.appendChild(div_todo_title);
          div_todo.appendChild(div_todo_dueDate);

          let div_todo_buttons = document.createElement("div");
          div_todo_buttons.className = "todo_buttons"
          let button_todo_expand = document.createElement("button");
          button_todo_expand.className = "todo_expand"
          button_todo_expand.innerHTML = "Expand";
          let button_todo_delete = document.createElement("button");
          button_todo_delete.className = "todo_delete";
          button_todo_delete.innerHTML = "Delete";
          div_todo_buttons.appendChild(button_todo_expand);
          div_todo_buttons.appendChild(button_todo_delete);

          div_todo_wrapper.appendChild(div_todo);
          div_todo_wrapper.appendChild(div_todo_buttons);

          div_project.appendChild(div_todo_wrapper);
     }
     projects.appendChild(div_project);
}

function createNewProject(projects_list) {
     let project_name = prompt("Please enter the new project name: ");
     let project_exists = false;

     if (project_name !== null) {
          for (let project of projects_list) {
               console.log(project.name);
               console.log(project_name);
               if (project.name === project_name) {
                    alert("That project already exists");
                    project_exists = true;
                    break;
               }
               // else {
               //      const new_project = new Project(crypto.randomUUID(), project_name);
               //      projects_list.push(new_project);
               // }
          }
          if (!project_exists) {
               const new_project = new Project(crypto.randomUUID(), project_name);
               projects_list.push(new_project);    
          }
     }    
}

