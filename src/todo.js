// export const test_message = "This is a test message";

export class todo {
    constructor(title, description, dueDate, priority, notes) {
        this.title = title,
        this.description = description;
        this.dueDate = dueDate,
        this.priority = priority;
        this.notes = notes;
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

    get notes() {
        return this._notes;
    }    

    set notes(notes) {
        this._notes = notes;
    }
}