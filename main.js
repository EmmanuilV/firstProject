class Task {
    constructor(id, title, description, done, dueDate) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.done = done;
        this.dueDate = new Date(dueDate);
    }
}

const todoItem = document.querySelector('main');
let todoList = [
    new Task(1, "Make Breakfast", "meat, vegetable", false, '2021-04-18'),
    new Task(2, "Make Dinner", "meat, rice", true, '2021-04-20'),
    new Task(3, "Make Supper", "meat, potato", false, '2021-04-25'),
    new Task(4, "Make Breakfast", "meat, vegetable", false, '2021-04-18'),
]



let taskForm = document.forms['task'];

taskForm.addEventListener('submit', (event) => {
    let lastId;
    for (let i = 0; i < todoList.length; i++) {
        if (todoList.length > 0) {
            lastId = todoList[i].id;
            lastId++;
        }
    }
    event.preventDefault();
    const formData = new FormData(taskForm);
    let obj = Object.fromEntries(formData.entries());
    const task = new Task(lastId, obj.title, obj.description, false, obj.dueDate);
    todoList.push(task);
    appendTask(task);
    taskForm.reset();
    console.log("Created: " + lastId, todoList[lastId - 1]);
})

function deleteTask(target) {
    let id = target.parentElement.id;
    for (let i = 0; i < todoList.length; i++) {
        if (todoList[i].id == id) {
            todoList.splice(i, 1);
            target.parentElement.remove();
        }
    }
}

const unfinishedButton = document.querySelector(".unfinished-task");

function completeTask(target) {
    let titleBlock = target.closest('DIV');
    titleBlock.classList.toggle('task-complete');
    if (unfinishedButton.classList.contains('on')) {
        titleBlock.closest("SECTION").style.display = 'none';
    }
}

function hideTasks(target) {
    let section = document.querySelectorAll('section');
    section.forEach(element => {
        if(element.querySelector('.title').classList.contains('task-complete')){
            element.style.display = 'none';
        }
    })
    
    if (!target.classList.contains('on')){
        document.querySelector('.buttons .on').classList.remove('on');
        target.classList.add('on');
    }
    

}

function activateButton(target) {

}

function showAllTasks(target) {
    let section = document.querySelectorAll('section');
    section.forEach(element =>{
        element.style.display = 'flex';
    })
    if (!target.classList.contains('on')){
        document.querySelector('.buttons .on').classList.remove('on');
        target.classList.add('on');
    }
}



function appendTask(task) {
    const { id, title, description, done, dueDate } = task;
    todoItem.innerHTML +=
        `<section id="${id}">` +
        `<button onclick="deleteTask(event.target)">&#735</button>` +
        `<div class="title ${isCompleteForTitle(done)}">` +
        `<input type="checkbox"  ${isCompleteForInput(done)} onclick="completeTask(event.target)"/>` +
        `<h3>${title}</h3>` +
        `</div>` +
        `<div class="info">` +
        `<p>${emptyDescription(description)}</p>` +
        `<p ${checkDate(dueDate, done)}>${getDueDate(dueDate)}</p>` +
        `</div>` +
        `</section>`;
}

function emptyDescription(description) {
    if (description == undefined ) {
        return '';
    } else {
        return description;
    }
}

function isCompleteForTitle(done) {
    if (done) {
        return 'task-complete';
    }
}

function isCompleteForInput(done) {
    if (done) {
        return 'checked';
    } else {
        return '';
    }
}

function getDueDate(dueDate) {
    if (dueDate === "" || dueDate === undefined || dueDate === null || dueDate == "Invalid Date") {
        return "";
    } else {
        return dueDate.toDateString();

    }
}

function checkDate(dueDate, done) {
    let date = new Date(dueDate);
    let now = new Date();

    if (date < now && done != true) {
        return 'class="over-due-date"'
    } else {
        return '';
    }

}

todoList.forEach(appendTask);