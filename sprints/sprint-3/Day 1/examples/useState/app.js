// app.js - Main module that ties everything together

import { useState, resetStateIndex } from './state.js';
import { renderTaskList, setupUIListeners } from './ui.js';

// Define the render function globally
export function render() {
  resetStateIndex();  // Reset state index before re-rendering
  App();              // Re-run the App function to update the UI
}

function App() {
  const [tasks, setTasks] = useState([], 'tasks'); // State for storing tasks
  const [filter, setFilter] = useState('all');     // State for the filter ('all', 'completed', 'uncompleted')

  // Update the UI with the current state
  renderTaskList(tasks, setTasks, filter);

  // Setup event listeners for UI interactions
  setupUIListeners(tasks, setTasks, filter, setFilter);
}

// Initial render
render();
