class Task {
    constructor(title, description, done, dueDate) {
        this.title = title;
        this.description = description;
        this.done = done;
        this.dueDate = dueDate;
    }
}

let todoList = [
    new Task("Make Breakfast", "meat, vegetables", false, '2021-04-18'),
    new Task("Make Dinner", "meat, rice", true, '2021-04-20'),
    new Task("Make Supper", "meat, potato", false, '2021-04-21')

]

const todoItem = document.querySelector('main');

function appendTask(task) {
    const { title, description, done, dueDate } = task;
    let date = new Date(dueDate);
    let dateStrFormat = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
    todoItem.innerHTML +=
        `<section>` +
            `<div class="check-title">` +
                `${isCompleteForInput(done)}` +
                `<h3 ${isCompleteForTitle(done)}>${title}</h3>` +
            `</div>` +
            `<p>${description}</p>` +
            `<p>${getDueDate(dateStrFormat)}</p>` +
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

function checkDate(dueDate) {
    if (dueDate != "" && dueDate != undefined) {
        if (dueDate < new Date().toda){}
    }
}

// function 
todoList.forEach(appendTask);
