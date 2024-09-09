// ui.js - Module for rendering UI and attaching event listeners

import { addTask, toggleTask, deleteTask, editTask, filterTasks } from './tasks.js';

export function renderTaskList(tasks, setTasks, filter) {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = ''; // Clear the task list

  const filteredTasks = filterTasks(tasks, filter);

  filteredTasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.id = task.id;
    taskItem.classList.add('task');
    taskItem.textContent = task.name;

    // Apply completed styling if the task is done
    if (task.completed) {
      taskItem.style.textDecoration = 'line-through';
    }

    // Toggle task completion on click
    taskItem.onclick = () => toggleTask(tasks, setTasks, task.id);

    // Button to delete the task
    const deleteButton = document.createElement('button');
    // add addTaskButton as id
    deleteButton.id = 'deleteButton';
    deleteButton.classList.add('deleteButton');
    deleteButton.textContent = 'X';
    deleteButton.onclick = (e) => {
      e.stopPropagation(); // Prevent task toggle when deleting
      deleteTask(tasks, setTasks, task.id);
    };
    taskItem.appendChild(deleteButton);

    // Button to edit the task
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = (e) => {
      e.stopPropagation(); // Prevent task toggle when editing
      const newTaskName = prompt('Edit Task', task.name);
      if (newTaskName) {
        editTask(tasks, setTasks, task.id, newTaskName);
      }
    };
    taskItem.appendChild(editButton);

    taskList.appendChild(taskItem);
  });
}

export function setupUIListeners(tasks, setTasks, filter, setFilter) {
  // Add task button listener
  document.getElementById('addTaskButton').onclick = () => {
    const taskInput = document.getElementById('taskInput');
    if (taskInput.value.trim()) {
      addTask(tasks, setTasks, taskInput.value);
      taskInput.value = ''; // Clear input field
    }
  };

  // Filter buttons
  document.getElementById('filterAll').onclick = () => setFilter('all');
  document.getElementById('filterCompleted').onclick = () => setFilter('completed');
  document.getElementById('filterUncompleted').onclick = () => setFilter('uncompleted');
}
