const todoItem = document.querySelector('main');

let taskForm = document.forms['task'];

function hideTasks(target) {
    let section = document.querySelectorAll('section');
    section.forEach(element => {
        if (element.querySelector('.title').classList.contains('task-complete')) {
            element.style.display = 'none';
        }
    })
    if (!target.classList.contains('on')) {
        document.querySelector('.buttons .on').classList.remove('on');
        target.classList.add('on');
        document.querySelector('main').classList.add('unfinishedTaskMode');
    }
}

function showAllTasks(target) {
    let section = document.querySelectorAll('section');
    section.forEach(element => {
        element.style.display = 'flex';
    })
    if (!target.classList.contains('on')) {
        document.querySelector('.buttons .on').classList.remove('on');
        target.classList.add('on');
        document.querySelector('main').classList.remove('unfinishedTaskMode');
    }
}



function appendTask(task) {
    const { todoItemId, title, description, done, dueDate } = task;
    todoItem.innerHTML +=
        `<section id="${todoItemId}">` +
        `<button onclick="deleteTask(event.target)">&#735</button>` +
        `<div class="title">` +
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
    if (description == undefined) {
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
        return dueDate.split('T')[0];

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

function showForm(target) {
    if (!target.classList.contains('show')) {
        target.classList.add('show');
        document.querySelector('form').style.display = 'flex';
    } else {
        target.classList.remove('show');
        document.querySelector('form').style.display = 'none';
    }
}

const tasksEndpoint = 'http://127.0.0.1:5000/api/todolists/1/tasks';

taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(taskForm);
    const task = Object.fromEntries(formData.entries());

    createTask(task)
        .then(appendTask)
        .then(_ => taskForm.reset());
})

function createTask(task) {
    return fetch(tasksEndpoint + '/item/create', {
        method: 'POST', 
        headers:  {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
    .then(response => response.json());
}

function deleteTask(target) {
    return fetch(`${tasksEndpoint}/delete/${target.parentElement.id}`, {
        method: 'DELETE',
    })
    .then(response => response.ok ? target.parentElement.remove() : alert('connection lost'));
}

function completeTask(target) {
    let titleBlock = target.closest('DIV');
    titleBlock.classList.toggle('task-complete');
    if (document.querySelector('main').classList.contains('unfinishedTaskMode')) {
        titleBlock.closest("SECTION").style.display = 'none';
    }

}

function updateCheckDone(params) {
    return fetch(`${tasksEndpoint}/update/${target.parentElement.id}`, {
        method: 'PUT', 
        headers:  {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
}

fetch(tasksEndpoint + '/all')
    .then(response => response.json())
    .then(todoList => todoList.forEach(appendTask))
    .catch(handlerError);
    
function handlerError() {
    todoItem.innerHTML = "Can't load tasks :("
}    

