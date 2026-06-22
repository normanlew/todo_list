export class Project {
    constructor(id, name) {
        this.name = name;
        this.id = id;
    }

    // constructor(data) {
    //     Object.assign(this, data);
    // }

    todoList = [];

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

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