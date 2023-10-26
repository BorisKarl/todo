
class Todo {
    constructor(date, title, description, priority, done) 
    {
        this.date = date;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.done = done;
     
    };

};

class Project {
    constructor(title, date, arrayOfTodos) {
        this.title = title;
        this.date = date;
        this.arrayOfTodos = arrayOfTodos;
    }

};

export { Todo, Project };
