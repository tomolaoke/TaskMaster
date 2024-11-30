const API_URL = 'http://localhost:5000/api/tasks';

// Fetch and display tasks
const fetchTasks = async () => {
  try {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task) => {
      const taskElement = document.createElement('li');
      taskElement.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <p>Deadline: ${task.deadline}</p>
        <p>Priority: ${task.priority}</p>
        <button class="update-btn" onclick="updateTask('${task._id}')">Update</button>
        <button class="delete-btn" onclick="deleteTask('${task._id}')">Delete</button>
      `;
      taskList.appendChild(taskElement);
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};

// Create a task
const createTask = async (taskData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });

    if (response.ok) {
      fetchTasks(); // Refresh task list after creation
    } else {
      const error = await response.json();
      alert(error.message);
    }
  } catch (error) {
    console.error('Error creating task:', error);
  }
};

// Delete a task
const deleteTask = async (taskId) => {
  try {
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      fetchTasks(); // Refresh task list after deletion
    } else {
      alert('Error deleting task');
    }
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};

// Update a task
const updateTask = (taskId) => {
  const title = prompt('Enter new title:');
  const description = prompt('Enter new description:');
  const deadline = prompt('Enter new deadline:');
  const priority = prompt('Enter new priority (low, medium, high):');

  const updatedData = {
    title,
    description,
    deadline,
    priority,
  };

  fetch(`${API_URL}/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  })
    .then((response) => {
      if (response.ok) {
        fetchTasks(); // Refresh task list after update
      } else {
        alert('Error updating task');
      }
    })
    .catch((error) => {
      console.error('Error updating task:', error);
    });
};

// Event listener for task creation form submission
document.getElementById('create-task-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const deadline = document.getElementById('deadline').value;
  const priority = document.getElementById('priority').value;

  const taskData = { title, description, deadline, priority };

  createTask(taskData);
});

const API_URL_TASKS = 'http://localhost:5000/api/tasks';
const token = localStorage.getItem('authToken');

async function fetchTasks() {
    try {
        const response = await fetch(API_URL_TASKS, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const tasks = await response.json();
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = ''; // Clear the list

        tasks.forEach(task => {
            const listItem = document.createElement('li');
            listItem.textContent = `${task.title} - ${task.priority}`;
            taskList.appendChild(listItem);
        });
    } catch (err) {
        console.error('Error fetching tasks:', err);
    }
}

// Initial fetch to load tasks on page load
fetchTasks();