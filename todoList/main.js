class Task {
    constructor(title, description, done, dueDate) {
        this.title = title;
        this.description = description;
        this.done = done;
        this.dueDate = dueDate;
    }
}

let index = 1;
const todoItem = document.querySelector('main');
let todoList = [
    new Task("Make Breakfast", "meat, vegetable", false, '2021-04-18'),
    new Task("Make Dinner", "meat, rice", true, '2021-04-20'),
    new Task("Make Supper", "meat, potato", false, '2021-04-25'),
    new Task("Make Breakfast", "meat, vegetable", false, '2021-04-18'),
    new Task("Make Dinner", "meat, rice", true, '2021-04-20'),
    new Task("Make Supper", "meat, potato", false, '2021-04-25'),
    new Task("Make Breakfast", "meat, vegetable", false, '2021-04-18'),
    new Task("Make Dinner", "meat, rice", true, '2021-04-20'),
    new Task("Make Supper", "meat, potato", false, '2021-04-25')
]

function deleteTask(target) {
    target.parentElement.remove();
    let id = target.parentElement.id;
    delete todoList[id - 1];
    console.log(id, todoList);
}

function generateId(task) {
    appendTask(task, index);
    index++;
}

/* function completeTask(target) {
    console.log(target.closest('SECTION'))
    target.closest('SECTION').style.display = 'none';
} */

function completeTask(target) {
    let id = target.parentElement.parentElement.id;
    if (todoList[id - 1].done) {
        todoList[id - 1].done = false;
        target.parentElement.classList.remove("task-complete");
    } else {
        todoList[id - 1].done = true;
        target.parentElement.classList.add("task-complete");
    }
}

function showTasks(target) {
    
    target.closest('SECTION').style.display = 'none';
}

function appendTask(task, index) {
    const { title, description, done, dueDate } = task;
    let date = new Date(dueDate);
    let dateStrFormat = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
    todoItem.innerHTML +=
        `<section id="${index}">` +
        `<button onclick="deleteTask(event.target)">&#735</button>` +
            `<div class="title ${isCompleteForTitle(done)}">` +
            `<input type="checkbox"  ${isCompleteForInput(done)} onclick="completeTask(event.target)"/>` +
            `<h3>${title}</h3>` +
        `</div>` +
        `<div class="info">` +
            `<p>${description}</p>` +
            `<p ${checkDate(dueDate, done)}>${getDueDate(dateStrFormat)}</p>` +
        `</div>` +
        `</section>`;
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
    if (dueDate != "" && dueDate != undefined) {
        return dueDate;
    } else {
        return "";
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

todoList.forEach(generateId);
