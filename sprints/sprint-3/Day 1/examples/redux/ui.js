
export const renderTaskList = (store) => {
  const { tasks, filter } = store.getState();  // Get the current state (tasks and filter)
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';  // Clear the task list

  const filteredTasks = filter === 'completed'
    ? tasks.filter(task => task.completed)
    : filter === 'uncompleted'
      ? tasks.filter(task => !task.completed)
      : tasks;  // Apply filtering based on the current filter

  filteredTasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.textContent = task.name;

    if (task.completed) {
      taskItem.style.textDecoration = 'line-through';
    }

    // Toggle task on click
    taskItem.addEventListener('click', () => {
      store.dispatch({ type: 'TOGGLE_TASK', payload: task.id });
    });

    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.addEventListener('click', (e) => {
      e.stopPropagation();  // Prevent toggling when clicking delete
      store.dispatch({ type: 'DELETE_TASK', payload: task.id });
    });

    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
  });
};

// Set up filter buttons
export const setupFilterButtons = (store) => {
  document.getElementById('filterAll').addEventListener('click', () => {
    store.dispatch({ type: 'SET_FILTER', payload: 'all' });
  });

  document.getElementById('filterCompleted').addEventListener('click', () => {
    store.dispatch({ type: 'SET_FILTER', payload: 'completed' });
  });

  document.getElementById('filterUncompleted').addEventListener('click', () => {
    store.dispatch({ type: 'SET_FILTER', payload: 'uncompleted' });
  });
};
