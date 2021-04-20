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
    new Task("Make Dinner", "meat, rice", false, '2021-04-20'),
    new Task("Make Supper", "meat, potato", false, '2021-04-21')

]

const todoItem = document.getElementById('tasks');
for (let id = 0; id < todoList.length; id++) {
    function appendTask(task, id) {
        const { title, description, done, dueDate } = task;

        todoItem.innerHTML += `<tr><td>${id+1}</td><td>${done}</td><td>${title}</td><td>${description}</td><td>${dueDate}</td></tr>`;
    }
}
todoList.forEach(appendTask);
