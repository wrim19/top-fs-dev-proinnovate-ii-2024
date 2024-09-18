// tasks.js - Module for task management

export function addTask(tasks, setTasks, taskName) {
  const newTask = { id: Date.now(), name: taskName, completed: false };
  setTasks([...tasks, newTask]);
}

export function toggleTask(tasks, setTasks, taskId) {
  const updatedTasks = tasks.map(task =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
  setTasks(updatedTasks);
}

export function deleteTask(tasks, setTasks, taskId) {
  const updatedTasks = tasks.filter(task => task.id !== taskId);
  setTasks(updatedTasks);
}

export function editTask(tasks, setTasks, taskId, newTaskName) {
  const updatedTasks = tasks.map(task =>
    task.id === taskId ? { ...task, name: newTaskName } : task
  );
  setTasks(updatedTasks);
}

export function filterTasks(tasks, filter) {
  if (filter === 'completed') {
    return tasks.filter(task => task.completed);
  } else if (filter === 'uncompleted') {
    return tasks.filter(task => !task.completed);
  }
  return tasks; // If 'all', return all tasks
}
