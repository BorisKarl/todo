// import { Project } from "./modules/project";
import { makeNewProject, addProjectButton, projectInputButton, getAll } from "./modules/functions";
import { titleInput, renderProject, activateProjectInput } from "./modules/dom_logic";
import { Todo, Project } from "./modules/todo";

// Buttons
const thisWeekButton = document.getElementById('thisWeek');
const deleteStorageButton = document.getElementById('deleteProjects');
const localSButton = document.getElementById('localStorage');


// Build examples
localSButton.addEventListener('click', () => {
    if (localStorage.length === 0) {
        alert('Examples are set...');
        const title_1 = 'Example one';
        const title_2 = 'Example two';
        const array = [];
        let array_1 = [];
        let array_2 = [];
        const pDate = new Date();
        let date = new Date();
        date = date.toLocaleDateString();
        const project_1 = new Project(title_1, pDate, array);
        const project_2 = new Project(title_2, pDate, array);
       
        const description_1 = 'Description todo_one';
        const description_2 = 'Description todo_two';
        const description_3 = 'Description todo_three';
        const description_4 = 'Description todo_four';
        const prio_1 = false;
        const prio_2 =  true;
        const todo_1 = new Todo(date, title_1, description_1, prio_1, false);
        const todo_2 = new Todo(date, title_1, description_2, prio_2, true);
        const todo_3 = new Todo(date, title_2, description_3, prio_2, false);
        const todo_4 = new Todo(date, title_2, description_4, prio_1, true);
        
        array_1.push(todo_1, todo_2);
        project_1.arrayOfTodos.push(array_1);
        
        array_2.push(todo_3, todo_4);
        project_2.arrayOfTodos.push(array_2);

        localStorage.setItem(title_2, JSON.stringify(project_2));
        renderProject(title_2);
        localStorage.setItem(title_1, JSON.stringify(project_1));
        renderProject(title_1);
        
    }else{
        for (let i = 0; i < localStorage.length; i++) {
            let title = localStorage.key(i);
            let storage = localStorage.getItem(title);
            console.log(`Titel ${title} mit dem Wert ${storage}`)
        };
    }
    
});

titleInput.addEventListener('keyup', function (event) {
    if (event.key === "Enter") {
        makeNewProject();
        renderProject(titleInput.value);
        titleInput.textContent = "";
        activateProjectInput();
    }
});

deleteStorageButton.addEventListener('click', () => {
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        localStorage.removeItem(key);
    }
})


addProjectButton.addEventListener('click', activateProjectInput);
projectInputButton.addEventListener('click', makeNewProject);
projectInputButton.addEventListener('click', () => {
    renderProject(titleInput.value);
}) ;
projectInputButton.addEventListener('click', activateProjectInput);


document.addEventListener('DOMContentLoaded', () => {
    let array = getAll();
    array.forEach(e => {
        renderProject(e.title);
    })
});
