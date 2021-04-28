const todoItem = document.querySelector('main');

let taskForm = document.forms['task'];


function hideTasks(target) {
    if (!target.classList.contains('on')) {
        document.querySelector('.buttons .on').classList.remove('on');
        target.classList.add('on');
        document.querySelector('main').classList.add('unfinishedTaskMode');
    }
}

function showAllTasks(target) {
    if (!target.classList.contains('on')) {
        document.querySelector('.buttons .on').classList.remove('on');
        target.classList.add('on');
        document.querySelector('main').classList.remove('unfinishedTaskMode');
    }
}



function appendTask(task) {
    const { todoItemId, title, description, done, dueDate } = task;
    todoItem.innerHTML +=
        `<section id="${todoItemId}" class="${isCompleteForTitle(done)}">` +
        `<button onclick="deleteTask(event.target)">&#735</button>` +
        `<div class="title">` +
        `<input type="checkbox" ${isCompleteForInput(done)}  onclick="completeTask(event.target)"/>` +
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
    return fetch(tasksEndpoint + '/item', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
        .then(response => response.json());
}

function deleteTask(target) {
    return fetch(`${tasksEndpoint}/${target.parentElement.id}`, {
        method: 'DELETE',
    })
        .then(response => response.ok ? target.parentElement.remove() : alert(response.statusText));
}

function completeTask(checkbox) {
    let taskElement = checkbox.closest('SECTION');
    let done = checkbox.checked;
    console.log("outside:" + done);
    updateTask(checkbox, done)
    .then(_ => taskElement.classList.toggle('task-complete'), alert)}
function updateTask(target, done) {
    console.log(done);
    return fetch(tasksEndpoint + '/todoItem/' + target.parentElement.parentElement.id, {
        method: 'PATCH',
        headers:  {
            'Content-Type': 'application/json-patch+json'
        },
        body: JSON.stringify([{ op : "replace", path : "/done", value : done }])
    })
}

function getTask(target) {
    const sectionId = target.parentElement.parentElement.id;
    console.log(sectionId);
    return fetch(`${tasksEndpoint}/todoItem/task/${sectionId}`)
        .then(response => response.json());
}

fetch(tasksEndpoint + '/all')
    .then(response => response.json())
    .then(todoList => todoList.forEach(appendTask))
    .catch(handlerError);

function handlerError() {
    todoItem.innerHTML = "Can't load tasks :("
}

