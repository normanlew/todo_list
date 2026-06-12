import { Todo } from "./todo.js";
import { Project } from "./project.js";
import "./styles.css";

const all_projects = [];

const button_new_project = document.querySelector("#new_project");

button_new_project.addEventListener("click", (event) => {
     console.log("new project button clicked");
     createNewProject(all_projects);
});

const button_new_todo = document.querySelector("#new_todo");

button_new_todo.addEventListener("click", (event) => {
     console.log("new todo button clicked");
     createNewTodo(all_projects);
});

const afternoonTodos = new Project(crypto.randomUUID(), "Afternoon");

addTodoToProject(afternoonTodos, "Call car repair", "Call dealership to do oil change", new Date(2018, 11, 24, 10, 33, 30),
     "Low", `This is the half-yearly service`, false);

addTodoToProject(afternoonTodos, "Schedule lunch with Bob", "Call Bob and the restaurant to set the time", 
     new Date(2018, 1, 24, 17, 53, 45), "Medium", "Bob will be in town for business", true);

addTodoToProject(afternoonTodos, "Go to gym", "Go to the LA fitness in the lobby", 
     new Date(2018, 1, 24, 19, 22, 22), "High", "Biweekly workout", false);

all_projects.push(afternoonTodos);
const projects = document.querySelector(".projects");

display_all_projects(all_projects);

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
     display_all_projects(projects_list);
}

function createNewTodo(projects_list) {
     //   <option value="afternoon">Afternoon</option>

     projects.innerHTML = 
     `<div class="new_todo_wrapper">
                    <form id="submit-form" method="POST" action="/form_submit">
                        <div class="projects_list">
                            <label for="projects_list">Project:</label>
                            <select name="projects_list" id="projects_list">
                                <option value="default">Default</option>
                            </select>
                        </div>
                        <div class="title">
                            <label for="title">Title:</label>
                            <input type="text" id="title" name="title">
                        </div>
                        <div class="description">
                            <label for="description">Description:</label>
                            <input type="text" id="description" name="description">
                        </div>
                        <div class="dueDate">
                            <label for="dueDate">Date and Time:</label>
                            <input type="datetime-local"  value="2017-06-01T08:30" id="dueDate" name="dueDate">
                        </div>
                        <div class="note">
                            <label for="note">Note:</label>
                            <textarea id="note" name="note" rows="5" cols="40" placeholder="Notes..."></textarea>
                        <div class="priority">
                            <label for="priority">Priority:</label>
                            <select name="priority" id="priority">
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        <div class="complete">
                            <label for="complete">Todo complete?:</label>
                            <select name="complete" id="complete">
                                <option value="false">Not complete</option>
                                <option value="true">Complete</option>
                            </select>
                        </div>
                        <div class="form_buttons">
                            <button type="submit" form="submit-form" value="form-submission" class="submit-button">
                                Submit
                            </button>
                            <button type="reset">
                                Reset
                            </button>
                            <button value="cancel_new_todo" class="cancel_button">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
     `
     const select_project = document.querySelector("#projects_list");
     for (let project of projects_list) {
          const project_option = project.name;
          const opt = document.createElement("option");
          // opt.value = project_option.toLowerCase();
          opt.innerHTML = project_option;
          select_project.appendChild(opt);
     }
     
     const form = document.querySelector("#submit-form");

     form.addEventListener('submit', (event) => {
          event.preventDefault();

          const formData = new FormData(form);
          const data = Object.fromEntries(formData.entries());

          event.target.reset();

          console.log(data);
          // console.log(typeof(data.read_status));
          console.log(data.projects_list);

          const project_name = data.projects_list;

          const index = projects_list.findIndex(project => project.name === project_name);
          console.log(index);

          addTodoToProject(projects_list[index], data.title, data.description, data.dueDate, data.priority, data.name, 
               `${data.complete === "true" ? true : false}`);

          display_all_projects(projects_list);

          // addBookToLibrary(data.title, data.author, data.pages, data.read_status === 'read' ? true : false);
          // table.innerHTML = "";
          // document.getElementById("form_new_book").style.display = "none";
          // generateTable(table, myLibrary);
          // generateTableHead(table);

     });

     const button_cancel = document.querySelector(".cancel_button");
     button_cancel.addEventListener("click", (event) => {
          display_all_projects()
     })
}

function addTodoToProject(project, title, description, dueDate, priority, note, complete) {
  let todo = new Todo(crypto.randomUUID(), title, description, dueDate, priority, note, complete);
  project.addTodo(todo);
}

function display_all_projects(projects_list) {
     projects.innerHTML = "";
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
               // div_todo_wrapper.id = todo.id;
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
               button_todo_expand.addEventListener("click", (event) => {
                    console.log("Todo expand clicked");
               });

               let button_todo_delete = document.createElement("button");
               button_todo_delete.className = "todo_delete";
               button_todo_delete.innerHTML = "Delete";
               button_todo_delete.id = todo.id;
               button_todo_delete.addEventListener("click", (event) => {
                    div_todo_wrapper.remove();
                    // console.log
               });

               div_todo_buttons.appendChild(button_todo_expand);
               div_todo_buttons.appendChild(button_todo_delete);

               div_todo_wrapper.appendChild(div_todo);
               div_todo_wrapper.appendChild(div_todo_buttons);

               div_project.appendChild(div_todo_wrapper);
          }
          projects.appendChild(div_project);
     }
}

