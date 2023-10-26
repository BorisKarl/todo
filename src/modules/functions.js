import { Todo, Project } from "./todo";
import { isThisWeek, parseISO, compareDesc, compareAsc } from "date-fns";



// Buttons
const thisWeekButton = document.getElementById('thisWeek_button');
const addProjectButton = document.getElementById('add_project_button');
const projectInputButton = document.getElementById('add_project_input');
const cancelProjectInputButton = document.getElementById('cancel_project_input');

const makeNewProject = () => {
    const projecTitleValue = titleInput.value;
    const arrayOfTodos = [];
    const date = new Date();
    const newProject = new Project(projecTitleValue, date, arrayOfTodos);
    localStorage.setItem(projecTitleValue, JSON.stringify(newProject));
};

const makeTodo = (title, date, description, priority, done) => {
    const todo = new Todo(date, title, description, priority, done);
    const array = [];
    array.push(todo);
    const storageProject = localStorage.getItem(title);
    if(storageProject === null) {
        const project = new Project(title, date, array);
        localStorage.setItem(title, JSON.stringify(project));
        console.log("Storage ist null und wird mit " + title + " initialisiert.");
        return;
    }
    let tmp = JSON.parse(storageProject);
    tmp.arrayOfTodos.push(array);
    localStorage.setItem(title, JSON.stringify(tmp));
    console.log(tmp);
};

const getAll = () => {
    let projects = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        // Falls localStorage garbage values oder anderes enthält, was wir nicht durchsuchen können
        try {
            const parsedValue = JSON.parse(value);
            projects.push(parsedValue);
        } catch (error) {
            console.log("Fehler in getall Funktion: " + key + "Value: " + value) + error;
        }
    }
  
    const sortedProjects = projects.sort((a, b) => compareAsc(parseISO(a.date), parseISO(b.date)))
   return sortedProjects;
    console.log("getall() " + JSON.stringify(sortedProjects));
    
}

const thisWeek = () => {
    let projects = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        // Falls localStorage garbage values oder anderes enthält, was wir nicht durchsuchen können
        try {
            const parsedValue = JSON.parse(value);
            projects.push(parsedValue);
        } catch (error) {
            console.log("Fehler in thisWeek Funktion: " + key + "Value: " + value) + error;
        }
    }

    const sortedProjects = projects.sort((a, b) => isThisWeek(parseISO(a.date), parseISO(b.date)))
    return sortedProjects;
}


const deleteTodo = (title, description) => {
    const storageItem = localStorage.getItem(title);
    const project = JSON.parse(storageItem);
    let newArray = []
    console.log("Das passiert in der Delete Funktion Schritt 1: " + JSON.stringify(project.arrayOfTodos) );
    const date = project.date;
    for(let i = 0; i < project.arrayOfTodos.length; i++) {
        console.log("Das array of todos " + project.arrayOfTodos[i][0]);
        console.log("Die description " + project.arrayOfTodos[i][0].description);
        if (project.arrayOfTodos[i][0].description !== description) {
            newArray.push(project.arrayOfTodos[i][0])
        }
        const todo_array = [];
        todo_array.push(newArray);
        console.log("Ausagabe des neuen arrays: " + newArray);
        const newProject = new Project(title, date, todo_array);
        localStorage.setItem(title, JSON.stringify(newProject));
        console.log("Storage wird mit delete_button aktualisiert." + newProject);
    }

}

const deleteAll = () => {
    const projects = getAll();
    projects.forEach((e) => 
        localStorage.removeItem(e.title),
    );
};

export { addProjectButton, makeTodo, projectInputButton, cancelProjectInputButton, makeNewProject, getAll, thisWeek, deleteAll, deleteTodo }
