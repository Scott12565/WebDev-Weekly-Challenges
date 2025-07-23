// Select DOM elements
const form = document.querySelector('.todo-form');
const input = document.querySelector('.todo');
const todoList = document.querySelector('.todo-list');

// Load tasks from localStorage or initialize an empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Save tasks to localStorage
const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render tasks to the DOM
const renderTasks = () => {
    // Clear current list
    todoList.innerHTML = '';

    // Loop through tasks and create list items
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.add('task-item');
        if (task.completed) li.classList.add('completed');

        // Add task text and buttons
        li.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button onclick="toggleComplete(${index})">✅</button>
        <button onclick="deleteTask(${index})">X</button>
      </div>
    `;

        todoList.appendChild(li);
    });
}

// Handle form submission to add a new task
form.addEventListener('submit', (e) => {
    e.preventDefault();
    // trim whitespace and check if input is not empty
    const text = input.value.trim();
    if (text) {
        tasks.push({ text, completed: false });
        input.value = '';
        saveTasks();
        renderTasks();
    }
});

// Toggle the completed state of a task
window.toggleComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
};

// Delete a task from the list
window.deleteTask = function (index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
};

// Initial rendering of tasks on page load
renderTasks();
