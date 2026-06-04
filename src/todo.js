// export const test_message = "This is a test message";

export class Todo {
    constructor(title, description, dueDate, priority, note, complete) {
        this.title = title,
        this.description = description;
        this.dueDate = dueDate,
        this.priority = priority;
        this.note = note;
        this.complete = complete;
    }

    get title() {
        return this._title;
    }    

    set title(title) {
        this._title = title;
    }

    get description() {
        return this._description;
    }    

    set description(description) {
        this._description = description;
    }

    get dueDate() {
        return this._dueDate;
    }    

    set dueDate(dueDate) {
        this._dueDate = dueDate;
    }

    get priority() {
        return this._priority;
    }    

    set priority(priority) {
        this._priority = priority;
    }

    get note() {
        return this._note;
    }    

    set note(note) {
        this._notes = note;
    }

    get complete() {
        return this.complete;
    }    

    set complete(complete) {
        this.complete = complete;
    }
}