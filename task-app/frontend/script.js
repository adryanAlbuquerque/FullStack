const apiUrl = 'http://localhost:3000/tasks';

async function fetchTasks() {
  const response = await fetch(apiUrl);
  const tasks = await response.json();
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.innerHTML = `
            ${task.title} 
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
    taskList.appendChild(li);
  });
}

async function addTask() {
  const taskInput = document.getElementById('new-task').value;

  if (taskInput) {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: taskInput }),
    });

    if (response.ok) {
      document.getElementById('new-task').value = '';
      fetchTasks();
    }
  }
}

async function deleteTask(id) {
  const response = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });

  if (response.ok) {
    fetchTasks();
  }
}

document.getElementById('add-task-btn').addEventListener('click', addTask);

fetchTasks();
