// import { Project } from "./project"
import { getAll, dateInput, projectTitle, makeTodo, deleteTodo } from "./functions";
import { Todo, Project } from "./todo";

const content = document.getElementById('project_container_content');


// Icons
const trashIconSVG = '<i class="material-icons">delete</i>';
const editIconSVG = '<i class="material-icons">zoom_in</i>';
const checkSVG = '<i class="material-icons w3-xlarge">check</i>';
const closeSVG = '<i class="material-icons">close</i>';
const addCircle =  '<i class="material-icons">add_circle_outline</i>';
const todo_svg = '<i class="material-icons">list</i>';

// for activate
const projectInputButton = document.getElementById('add_project_input');
const cancelProjectInputButton = document.getElementById('cancel_project_input');
const titleInput = document.getElementById('titleInput');


const activateProjectInput = () => {   
    titleInput.classList.toggle('active');
    titleInput.value = "";
    titleInput.focus();
    projectInputButton.classList.toggle('active');
    cancelProjectInputButton.classList.toggle('active');
}

cancelProjectInputButton.addEventListener('click', () => {
    titleInput.textContent = "";
    activateProjectInput();
});

const renderProject = (title) => {
    const storage = localStorage.getItem(title);
    console.log("Storage: " + storage);
    const project = JSON.parse(storage);
    console.log("JSON.parse project; " + project);
    console.log("project.title: " + project.title);
    const header = document.createElement('h2');
    const todo_button = document.createElement('div');
    const project_div = document.createElement('div');
    const edit = document.createElement('div');
    const delete_svg = document.createElement('div');
    const buttonDiv = document.createElement('div');
    const title_content = document.getElementById('project_title_content');
    const li_title = document.createElement('li');
    li_title.classList.add('listTitle');
    li_title.textContent = title;
    title_content.prepend(li_title);
    buttonDiv.classList.add('button_div');
    project_div.classList.add('project_div');
    project_div.setAttribute('id', title);
    edit.classList.add('edit');
    delete_svg.classList.add('delete');
    edit.innerHTML = addCircle;
    todo_button.innerHTML = todo_svg;
    header.textContent = title;
    delete_svg.innerHTML = trashIconSVG;
    buttonDiv.appendChild(edit);
    buttonDiv.appendChild(todo_button);
    buttonDiv.appendChild(delete_svg);
    project_div.appendChild(header);
    project_div.appendChild(buttonDiv);
    content.prepend(project_div);
    
    todo_button.addEventListener('click', () => {
        renderTodos(title);
    })

    delete_svg.addEventListener('click', () => {
        localStorage.removeItem(title);
        content.removeChild(project_div);
        title_content.removeChild(li_title);
    });

    edit.addEventListener('click', () => {
        addTodo(title);
    })

    li_title.addEventListener('click', () => {
        renderTodos(title);
    })
};

const addTodo = (title) => {
    const div = document.createElement('div');
    const date = document.createElement('input');
    const description = document.createElement('textarea');
    const checkIcon = document.createElement('div');
    const close = document.createElement('div');
    const radio_prio = document.createElement('input');
    const radioLabel = document.createElement('label');
    const radio_div = document.createElement('div');
    const date_p = document.createElement('p');
    const date_div = document.createElement('div');
    date_div.setAttribute('id', 'date_div');
    radio_div.setAttribute('id', 'radio_div');
    radio_div.setAttribute('for', 'radio_prio');
    radioLabel.innerHTML = "High priority?";
    radio_prio.setAttribute("type", "radio");
    radio_prio.setAttribute('id', 'radio_prio');
    div.classList.add('tile_with_zoom');
    // div transform
    setTimeout(() => {
        div.style.transform = 'scale(1)';
    }, 10);
    checkIcon.setAttribute('id', 'check');
    close.setAttribute('id', 'close');
    date.setAttribute('type', 'date');
    date.setAttribute('id', 'date_input');
    date.required = true;
    description.setAttribute('placeholder', 'Add some Details!');
    date_p.textContent = "Choose a due date!";
    checkIcon.innerHTML = checkSVG;
    close.innerHTML = closeSVG;
    date_div.appendChild(date_p);
    date_div.appendChild(date);
    radio_div.appendChild(radioLabel);
    radio_div.appendChild(radio_prio);
    div.appendChild(close);
    div.appendChild(date_div);
    div.appendChild(description);
    div.appendChild(radio_div);
    div.appendChild(checkIcon);
    content.appendChild(div);

    checkIcon.addEventListener('click', () => {
        let newDueDate = new Date(date.value);
        let formattedDueDate = newDueDate.toLocaleDateString();
        console.log(formattedDueDate);
        console.log("AddTodo: " + title + formattedDueDate + description.value + radio_prio.checked);
        content.removeChild(div);
        makeTodo(title, formattedDueDate, description.value, radio_prio.checked, false);
    });

    date.addEventListener('input', () => {
        description.focus();
    })

    close.addEventListener('click', () => {
        setTimeout(() => {
            content.removeChild(div);
        }, 100);

    })
}

const renderTodos = (title) => {
    const tmp = localStorage.getItem(title);
    const project = JSON.parse(tmp);
    console.log(JSON.stringify(project));
    const project_div = document.getElementById(project.title);
    console.log("Das hat getelementbyId gefunden: " + project_div);
    console.log(project);
    if (project === undefined || project.arrayOfTodos === undefined) {
        return;
    };
    
    // remove item if button is clicked again
    if (document.getElementById('todo_content_' + title)) {
        const rm = document.getElementById('todo_content_' + title);
        console.log("div length: " + project_div.children.length);
        project_div.removeChild(rm);
    } else {
        const todo_content = document.createElement('div');
        todo_content.classList.add('todo_content');
        todo_content.setAttribute('id', 'todo_content_' + title);
        project_div.appendChild(todo_content);
        
        for (let i = 0; i < project.arrayOfTodos.length; i++) {
            const todoDiv = document.createElement('div');
            console.log(project.arrayOfTodos);
          
            todoDiv.setAttribute('id', project.title + i);
            const todoDate = document.createElement('div');
            todoDate.classList.add('dateTodo');
            const todoDescription = document.createElement('p');
            todoDescription.setAttribute('id', 'description_paragraph' + i)
            // prio
            const todoPriority = document.createElement('div');
            todoPriority.classList.add('prioDiv');
            // checkbox
            const checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            const labelCheckbox = document.createElement('label');
            labelCheckbox.textContent = "Just did it?";
            const checkBoxDiv = document.createElement('div');
            
            // delete
            const delete_button = document.createElement('div');
            delete_button.innerHTML = trashIconSVG; 
            // edit
            const edit = document.createElement('div');
            edit.classList.add('editTodoDiv');
            edit.innerHTML = editIconSVG;
            edit.addEventListener('click', () => {
                // Edit todos
                editTodo(project.arrayOfTodos[i][0], i);
            } )
            
            console.log("Testarray vor Text: " + project.arrayOfTodos[i][0].description);
            console.log("So sieht das Projekt aus: " + project);
            let text = project.arrayOfTodos[i][0].description;
            if (text.length > 8) {
                text = text.substring(0, 8) + "...";
            }
            todoDescription.textContent = text;
            todoDate.textContent = project.arrayOfTodos[i][0].date;
            
            let prio = project.arrayOfTodos[i][0].priority;
            if (prio === true) {
                todoPriority.textContent = "High priority";
                todoPriority.style.color = "red";
            } else {
                todoPriority.textContent = "Low priority";
                todoPriority.style.color = "green";
            }    
                    
            let todo_done = project.arrayOfTodos[i][0].done;
            console.log(todo_done);
            if (todo_done === true) {
                todoDescription.classList.add('line_through');
                todoPriority.classList.add('line_through');
                todoDate.classList.add('line_through');
                checkbox.disabled = true;
            }

            checkbox.addEventListener('click', () => {
               
                if (checkbox.checked === true) {
                    console.log("Done clicked!");
                    project.arrayOfTodos[i][0].done = true;
                    console.log("aus dem eventListener" + project.arrayOfTodos[i][0].done);
                    todoDescription.classList.add('line_through');
                    todoPriority.classList.add('line_through');
                    todoDate.classList.add('line_through');
                    console.log("Das kommt aus dem EventListener" + project.arrayOfTodos[i][0].description);
                    deleteTodo(title, project.arrayOfTodos[i][0].description);
                    makeTodo(title, project.arrayOfTodos[i][0].date, project.arrayOfTodos[i][0].description, project.arrayOfTodos[i][0].priority, true);
                    console.log("done checkBox" + project.arrayOfTodos[i][0].description);
                    const delete_div = document.getElementById(title + i);
                    
                    setTimeout(() => {
                        todo_content.removeChild(delete_div);
                    }, 100);
                   
                    //todo_content.removeChild(delete_div);
                } else {
                    project.arrayOfTodos[i][0].done = false;
                    todoDescription.classList.remove('line-through');
                    todoDescription.classList.remove('line-through');
                }
                });

            delete_button.addEventListener('click', () => {
                console.log("delete_button" + project.arrayOfTodos[i][0].description);
                const delete_div = document.getElementById(project.title + i);
                todo_content.removeChild(delete_div);
                deleteTodo(project.title, project.arrayOfTodos[i][0].description);
                
            } );
            checkBoxDiv.appendChild(labelCheckbox);
            checkBoxDiv.appendChild(checkbox);
            todoDiv.appendChild(edit);
            todoDiv.appendChild(todoDate);
            todoDiv.appendChild(todoDescription);
            todoDiv.appendChild(todoPriority);
            todoDiv.appendChild(checkBoxDiv);
            todoDiv.appendChild(delete_button);
            todo_content.appendChild(todoDiv);
       
        }
    }
    
};

const timeOut = (array) => {
    for(let i = 0; i < array.length; i++) {
        setTimeout((index) => {
            displayProjects(array[index]);
        }, 500 * i, i);
    }
};

const clearArray = () => {
    let clearArray = getAll();
    clearArray.forEach(element => {
        removeProjects(element);
    })
}

const editTodo = (object, i) => {
    console.log("editStorage Function, an der ich heute am Dienstag arbeite: " + JSON.stringify(object));
    const div = document.createElement('div');
    const prio = document.createElement('div');
    const infoText = document.createElement('div');
    const infoP = document.createElement('p');
    const newDate = document.createElement('input');
    const dateText = document.createElement('p');
    const newDetails = document.createElement('textarea');
    const checkIcon = document.createElement('div');
    const close = document.createElement('div');
    div.setAttribute('id', 'tile_with_zoom');
    div.classList.add('tile_with_zoom');
    prio.setAttribute('id', 'prio');
    checkIcon.setAttribute('id', 'check');
    close.setAttribute('id', 'close');
    newDate.setAttribute('id', "newDate");
    newDetails.setAttribute('id', "newDetails");
    newDate.setAttribute('type', 'date');
    dateText.textContent = "Due date: " + object.date;
    newDetails.textContent = object.description;
    checkIcon.innerHTML = checkSVG;
    close.innerHTML = closeSVG;
    infoText.setAttribute('id', 'infoText');
    infoP.textContent = "To edit choose a new date/description or click on priority!";
    infoText.appendChild(infoP);

    if(object.priority === true){
        prio.textContent = "High priority";
        prio.style.color = "red";
    } else {
        prio.textContent = "Low priority";
        prio.style.color = "green";
    };

    div.appendChild(close);
    div.appendChild(infoText);
    div.appendChild(dateText);
    div.appendChild(newDate);
    div.appendChild(prio);
    div.appendChild(newDetails);
    div.appendChild(checkIcon);
    content.appendChild(div);

    setTimeout(() => {
        div.style.transform = 'scale(1)';
    }, 10);

    prio.addEventListener('click', () => {
        console.log('clicked on prio');
        if (prio.textContent === "High priority") {

            prio.textContent = "Low priority";
            prio.style.color = "green";
        } else {
            prio.textContent = "High priority";
            prio.style.color = "red";
        }
    });


    checkIcon.addEventListener('click', () => {
        editStorage(object, i);
    } );
    newDetails.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            editStorage(object, i);
        }
        });

        close.addEventListener('click', () => {
            setTimeout(() => {
                content.removeChild(div);
            }, 300)});
};

const editStorage = (todo_object, i) => {

    const div = document.getElementById('tile_with_zoom');
    const newDate = document.getElementById('newDate');
    const newPrio = document.getElementById('prio');
    const newDetails = document.getElementById('newDetails');
    const descrTodo = document.getElementById('description_paragraph' + i);
    let newDueDate = new Date(newDate.value);
    let formattedDueDate = newDueDate.toLocaleDateString();

    if (formattedDueDate === "Invalid Date") {
        formattedDueDate = todo_object.date;
    }

    let newDescription = newDetails.value;
    console.log(newDescription);
    if (newDescription === "") {
        newDescription = todo_object.description;
    }

    
    todo_object.date = formattedDueDate;
    todo_object.description = newDescription;
    if (newPrio.textContent === "High priority"){
        todo_object.priority = true;
    }else{
        todo_object.priority = false;
    };
    descrTodo.textContent = newDescription;

    div.style.transform = 'scale(0)';
    setTimeout(() => {
        content.removeChild(div);
    }, 300);

    // Storage Eingriff
    
    const storageItem = localStorage.getItem(todo_object.title);
    const project = JSON.parse(storageItem);
    const todo = JSON.stringify(project.arrayOfTodos[i][0]);
    const newTodo = new Todo(formattedDueDate, todo_object.title, newDescription, todo_object.priority, project.arrayOfTodos[i][0].done);
    project.arrayOfTodos[i][0] = newTodo;
    localStorage.setItem(todo_object.title, project.date, JSON.stringify(project));
    document.getElementById(todo_object.title + i).remove();
    location.reload();
    console.log('So sieht das storage aus dem das todo stammt aus: ' + storageItem);   
    console.log("Und nun das array nach der Funktion - " + JSON.stringify(todo_object));
    console.log(`Die Variable ${i} wird mitgeschleift` + todo);
    console.log('Verändertes Objekt: ' + JSON.stringify(project));
}


export { activateProjectInput, titleInput, renderProject, timeOut };
