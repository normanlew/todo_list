export class Project {
    constructor(name) {
        this.name = name;
    }

    todoList = [];

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    addTodo(todo) {
        this.todoList.push(todo);
    }
} 