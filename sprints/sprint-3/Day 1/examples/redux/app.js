
import { reducer } from "./reducer.js";
import { createStore } from "./store.js";
import { setupFilterButtons,renderTaskList } from "./ui.js";

// Initialize the store with an initial state and reducer
const initialState = {
  tasks: [],    // Initial task list (empty)
  filter: 'all', // Initial filter ('all', 'completed', 'uncompleted')
};

const store = createStore(reducer, initialState);

// Subscribe to the store and re-render the UI when state changes
store.subscribe(() => renderTaskList(store));

// Add event listener for adding tasks
document.getElementById('addTaskButton').addEventListener('click', () => {
  const taskInput = document.getElementById('taskInput');
  const taskName = taskInput.value.trim();
  if (taskName) {
    store.dispatch({ type: 'ADD_TASK', payload: taskName });
    taskInput.value = '';  // Clear the input field
  }
});

// Setup the filter buttons for filtering tasks
setupFilterButtons(store);

// Initial render
renderTaskList(store);
