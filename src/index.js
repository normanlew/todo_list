import { Todo } from "./todo.js";
import { Project } from "./project.js";
import "./styles.css";

const all_projects = [];

///////////
// const all_projects = JSON.parse(localStorage.getItem("projects") || "[]");

const button_new_project = document.querySelector("#new_project");

button_new_project.addEventListener("click", (event) => {
     // console.log("new project button clicked");
     createNewProject(all_projects);
});

const button_new_todo = document.querySelector("#new_todo");

button_new_todo.addEventListener("click", (event) => {
     // console.log("new todo button clicked");
     createNewTodo(all_projects);
});

// const afternoonTodos = new Project(crypto.randomUUID(), "Afternoon");
// const eveningTodos = new Project(crypto.randomUUID(), "Evening");

////////////
if (localStorage.length <= 0) {
     const defaultTodos = new Project(crypto.randomUUID(), "Default");
     all_projects.push(defaultTodos); 
     localStorage.setItem("projects", JSON.stringify(all_projects));
}
else {
     const unhydrated_projects = JSON.parse(localStorage.getItem("projects"));
     unhydrated_projects.forEach((proj) => {
          // console.log(proj);
          const hydrated_project = new Project(proj._id, proj._name);
          proj.todoList.forEach((todo) => {
               // hydrated_project.addTodo(todo);
               const hydrated_todo = new Todo(todo._id, todo._title, todo._description, todo._dueDate, todo._priority,
                    todo._note, todo._complete);
               hydrated_project.addTodo(hydrated_todo);
          });
          all_projects.push(hydrated_project);
          // console.log(all_projects);
     });
}



// addTodoToProject(afternoonTodos, "Call car repair", "Call dealership to do oil change", new Date(2018, 11, 24, 10, 33, 30),
//      "Low", `This is the half-yearly service`, false);

// addTodoToProject(afternoonTodos, "Schedule lunch with Bob", "Call Bob and the restaurant to set the time", 
//      new Date(2018, 1, 24, 17, 53, 45), "Medium", "Bob will be in town for business", true);

// addTodoToProject(afternoonTodos, "Go to gym", "Go to the LA fitness in the lobby", 
//      new Date(2018, 1, 24, 19, 22, 22), "High", "Biweekly workout", false);

// addTodoToProject(eveningTodos, "Walk the dog", "Take a stroll through the neighborhood with dog", 
//      new Date(2026, 1, 24, 18, 53, 45), "Low", "Should eventually be a daily event", false);

// addTodoToProject(eveningTodos, "Make dinner", "Use ingredients in the refrigerator", 
//      new Date(2026, 5, 30, 19, 22, 22), "High", "There should be meat and veggies as well as a starch", false);

// all_projects.push(afternoonTodos);
// all_projects.push(eveningTodos);
const projects = document.querySelector(".projects");

display_all_projects(all_projects);

function createNewProject(projects_list) {
     let project_name = prompt("Please enter the new project name: ");
     let project_exists = false;

     if (project_name !== null) {
          for (let project of projects_list) {
               // console.log(project.name);
               // console.log(project_name);
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
               
               //////////
               localStorage.removeItem("projects");
               localStorage.setItem("projects", JSON.stringify(projects_list));
          }
     }    
     // console.log(localStorage);
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
                            <input type="datetime-local"  value="2026-06-01T08:30" id="dueDate" name="dueDate">
                        </div>
                        <div class="note">
                            <label for="note">Note:</label>
                            <textarea id="note" name="note" rows="5" cols="40" placeholder="Notes..."></textarea>
                        <div class="priority">
                            <label for="priority">Priority:</label>
                            <select name="priority" id="priority">
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
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
                            <button form="submit-form" type="reset">
                                Reset
                            </button>
                            <button form="submit-form" value="cancel_new_todo" class="cancel_button">
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

          // console.log(data);
          // console.log(typeof(data.read_status));
          // console.log(data.projects_list);

          const project_name = data.projects_list;

          const index = projects_list.findIndex(project => project.name === project_name);
          // console.log(index);

          // console.log(data.complete);

          const todo_complete = data.complete === "true" ? true : false;

          addTodoToProject(projects_list[index], data.title, data.description, data.dueDate, data.priority, data.note, 
                         todo_complete);
               // `${data.complete === "true" ? true : false}`);

          /////////////
          localStorage.removeItem("projects");
          localStorage.setItem("projects", JSON.stringify(projects_list));

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
     // console.log("inside display_all_projects function: ");
     // console.log(projects_list);
     // projects.innerHTML = "";
     projects.replaceChildren();
     for (let project of projects_list) {
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

               // console.log(todo.title);
               // console.log(todo.complete);
               if (todo.complete === true) {
                    // console.log(todo.title + " should be black");
                    div_todo.style.backgroundColor = "rgb(48,47,47)";
               }

               let div_todo_buttons = document.createElement("div");
               div_todo_buttons.className = "todo_buttons"
               let button_todo_expand = document.createElement("button");
               button_todo_expand.className = "todo_expand"
               button_todo_expand.innerHTML = "Expand";
               button_todo_expand.addEventListener("click", (event) => {
                    // console.log("Todo expand clicked");
                    displayFullTodo(todo, project, projects_list);
               });

               let button_todo_delete = document.createElement("button");
               button_todo_delete.className = "todo_delete";
               button_todo_delete.innerHTML = "Delete";
               button_todo_delete.id = todo.id;
               button_todo_delete.addEventListener("click", (event) => {
                    // div_todo_wrapper.remove();
                    // console.log
                    const index = project.todoList.findIndex(_todo => _todo.id === todo.id);
                    project.todoList.splice(index, 1);
                    localStorage.removeItem("projects");
                    localStorage.setItem("projects", JSON.stringify(projects_list));
                    display_all_projects(projects_list);
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

function displayFullTodo(todo, project, projects_list) {
     const todo_display = document.createElement("div");
     todo_display.className = "todo_display";

     const div_project = document.createElement("div");
     div_project.className = "fullTodo"
     const h2_project = document.createElement("h2");
     h2_project.innerHTML = "Project: ";
     const p_project = document.createElement("p");
     p_project.innerHTML = project.name;
     div_project.appendChild(h2_project);
     div_project.appendChild(p_project);
     // const div_title = document.createElement("div")
     // const project_title = project.title;
     // div_project_title.appendChild(div_name_wrapper);

     const div_title = document.createElement("div");
     div_title.className = "fullTodo";
     const h2_title = document.createElement("h2");
     h2_title.innerHTML = "Title:";
     const p_title = document.createElement("p");
     p_title.innerHTML = todo.title;
     div_title.appendChild(h2_title);
     div_title.appendChild(p_title);
     
     const div_description = document.createElement("div");
     div_description.className = "fullTodo";
     const h2_description = document.createElement("h2");
     h2_description.innerHTML = "Description:";
     const p_description = document.createElement("p");
     p_description.innerHTML = todo.description;
     div_description.appendChild(h2_description);
     div_description.appendChild(p_description);

     const div_dueDate = document.createElement("div");
     div_dueDate.className = "fullTodo";
     const h2_dueDate = document.createElement("h2");
     h2_dueDate.innerHTML = "Due date: ";
     const p_dueDate = document.createElement("p");
     p_dueDate.innerHTML = todo.dueDate;
     div_dueDate.appendChild(h2_dueDate);
     div_dueDate.appendChild(p_dueDate);

     const div_note = document.createElement("div");
     div_note.className = "fullTodo";
     const h2_note = document.createElement("h2");
     h2_note.innerHTML = "Notes: ";
     const p_note = document.createElement("p");
     p_note.innerHTML = todo.note;
     div_note.appendChild(h2_note);
     div_note.appendChild(p_note);

     const div_priority = document.createElement("div");
     div_priority.className = "fullTodo";
     const h2_priority  = document.createElement("h2");
     h2_priority.innerHTML = "Priority: ";
     const p_priority = document.createElement("p");
     p_priority.innerHTML = todo.priority;
     div_priority.appendChild(h2_priority);
     div_priority.appendChild(p_priority);

     const div_complete = document.createElement("div");
     div_complete.className = "fullTodo";
     const h2_complete = document.createElement("h2");
     h2_complete.innerHTML = "Completion status: ";
     const p_complete = document.createElement("p");
     // console.log("todo status: " + todo.complete);
     p_complete.innerHTML = `${todo.complete ? "Complete" : "Not Complete"}`;
     div_complete.appendChild(h2_complete);
     div_complete.appendChild(p_complete);

     const div_button_done_edit = document.createElement("div");
     // div_button_done_edit.className = "fullTodo";
     // div_title.className = "fullTodo";
     const button_done = document.createElement("button");
     button_done.textContent = "Done";
     button_done.addEventListener("click", (event) => {
          projects.replaceChildren();
          display_all_projects(projects_list);
     });
     div_button_done_edit.appendChild(button_done);
     const button_edit = document.createElement("button");
     button_edit.textContent = "Edit";
     button_edit.addEventListener("click", (event)=> {
          showTodoEdit(todo, project, projects_list);
     });
     div_button_done_edit.appendChild(button_edit);


     todo_display.appendChild(div_project);
     todo_display.appendChild(div_title);
     todo_display.appendChild(div_description);
     todo_display.appendChild(div_dueDate);
     todo_display.appendChild(div_note);
     todo_display.appendChild(div_priority);
     todo_display.appendChild(div_complete);
     todo_display.appendChild(div_button_done_edit);


     projects.replaceChildren();
     // projects.innerHTML = "";
     projects.appendChild(todo_display);

}

function showTodoEdit(todo, project, projects_list) {
     // console.log("inside showTodoEdit function: ");
     // console.log(projects_list);
     // console.log(todo.title);
     // console.log("todo status2: " + todo.complete);
     projects.innerHTML = 
     `<div class="new_todo_wrapper">
          <form id="change_form" method="POST" action="/form_submit">
               <div class="projects_list">
                    <label for="projects_list">Project:</label>
                    <select name="projects_list" id="projects_list">
                    </select>
               </div>
               <div class="title">
                    <label for="title">Title:</label>
                    <input type="text" id="title" name="title" size="60" value="${todo.title}">
               </div>
               <div class="description">
                    <label for="description">Description:</label>
                    <input type="text" id="description" name="description" value="${todo.description}">
               </div>
               <div class="dueDate">
                    <label for="dueDate">Date and Time:</label>
                    <input type="datetime-local"  id="dueDate" name="dueDate"
                    value="${todo.dueDate}">
               </div>
               <div class="note">
                    <label for="note">Note:</label>
                    <textarea id="note" name="note" rows="5" cols="40" placeholder="${todo.note}"></textarea>
               <div class="priority">
                    <label for="priority">Priority:</label>
                    <select name="priority" id="priority">
                         <option value="Low" ${"Low" === todo.priority ? "selected" : ""}>Low</option>
                         <option value="Medium" ${"Medium" === todo.priority ? "selected" : ""}>Medium</option>
                         <option value="High" ${"High" === todo.priority ? "selected" : ""}>High</option>
                    </select>
               <div class="complete">
                    <label for="complete">Todo complete?:</label>
                    <select name="complete" id="complete">
                         <option value="false" ${todo.complete === false ? "selected" : ""}>Not complete</option>
                         <option value="true" ${todo.complete === true ? "selected" : ""}>Complete</option>
                    </select>
               </div>
               <div class="form_buttons">
                    <button type="submit" form="change_form" value="form_change" class="change_button">
                         Change
                    </button>
                    <button form="change_form" value="cancel_change_todo" class="cancel_button">
                         Cancel
                    </button>
               </div>
          </form>
     </div>
     `
     const select_project = document.querySelector("#projects_list");
     for (let proj of projects_list) {
          const project_option = proj.name;
          const opt = document.createElement("option");
          // opt.value = project_option.toLowerCase();
          opt.innerHTML = project_option;
          if (proj.name === project.name) {
               opt.selected = true;
          }
          select_project.appendChild(opt);
     }

     const button_cancel = document.querySelector(".cancel_button");

     button_cancel.addEventListener("click", (event) => {
          // display_all_projects(projects_list);
          displayFullTodo(todo, project, projects_list);
     })
     
     const form = document.querySelector("#change_form");

     form.addEventListener('submit', (event) => {
          event.preventDefault();

          const formData = new FormData(form);
          const data = Object.fromEntries(formData.entries());

          event.target.reset();

          // console.log(data);

          todo.title = data.title;
          todo.description = data.description;
          todo.dueDate = data.dueDate;
          todo.priority = data.priority;
          todo.note = data.note;
          todo.complete = data.complete === "true" ? true: false;

          if (data.projects_list !== project.name) {
               const new_index = projects_list.findIndex(project => project.name === data.projects_list);
               projects_list[new_index].todoList.push(todo);

               const old_index = projects_list.findIndex(proj => proj.name === project.name);
               // console.log("old_index: " + old_index);
               const oldProject = projects_list[old_index];
               // console.log(old_project);
               const old_todo_index = oldProject.todoList.findIndex(todo_old => todo_old.id === todo.id);
               oldProject.todoList.splice(old_todo_index, 1);
          }
          // console.log(typeof(data.read_status));
          // console.log(data.projects_list);

          // const project_name = data.projects_list;

          // const index = projects_list.findIndex(project => project.name === project_name);
          // console.log(index);

          // addTodoToProject(projects_list[index], data.title, data.description, data.dueDate, data.priority, data.name, 
          //      `${data.complete === "true" ? true : false}`);

          localStorage.removeItem("projects");
          localStorage.setItem("projects", JSON.stringify(projects_list));

          display_all_projects(projects_list);

          // addBookToLibrary(data.title, data.author, data.pages, data.read_status === 'read' ? true : false);
          // table.innerHTML = "";
          // document.getElementById("form_new_book").style.display = "none";
          // generateTable(table, myLibrary);
          // generateTableHead(table);

     });

     // const button_cancel = document.querySelector(".cancel_button");
     // button_cancel.addEventListener("click", (event) => {
     //      display_all_projects()
     // })
}

