class Task {
    constructor(title, description, done, dueDate) {
        this.title = title;
        this.description = description;
        this.done = done;
        this.dueDate = dueDate;
    }
}

let todoList = [
    new Task("Make Breakfast", "meat, vegetable", false, '2021-04-18'),
    new Task("Make Dinner", "meat, rice", true, '2021-04-20'),
    new Task("Make Supper", "meat, potato", false, '2021-04-25')

]

const todoItem = document.querySelector('main');



function deleteTask(target) {
    target.parentElement.remove();
}

function generationId(task) {
    let index = 1;
    appendTask(task, index);
    index++;
}

function appendTask(task, index) {
    const { title, description, done, dueDate } = task;
    let date = new Date(dueDate);
    let dateStrFormat = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
    todoItem.innerHTML +=
        `<section id="${index}">` +
        `<button onclick="deleteTask(event.target)">&#735</button>` +
            `<div class="title">` +
                `${isCompleteForInput(done)}` +
                `<h3 ${isCompleteForTitle(done)}>${title}</h3>` +
            `</div>` +
            `<div class="info">`+
                `<p>${description}</p>` +
                `<p ${checkDate(dueDate, done)}>${getDueDate(dateStrFormat)}</p>` +
            `</div>` +
        `</section>`;
}

function isCompleteForTitle(done) {
    if (done) {
        return 'class="task-complete"';
    }
}

function isCompleteForInput(done) {
    if (done) {
        return '<input type="checkbox" checked />';
    } else {
        return '<input type="checkbox"/>';
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
    }
}

todoList.forEach(generationId);
