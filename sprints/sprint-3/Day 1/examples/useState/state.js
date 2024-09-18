// state.js - Module for managing state
import { render } from './app.js';  // Import the render function

let state = [];
let stateIndex = 0;

export function useState(initialValue, key) {
  // Load state from localStorage if key exists
  const storedValue = key ? JSON.parse(localStorage.getItem(key)) : null;
  state[stateIndex] = storedValue !== null ? storedValue : initialValue;
  
  const currentIndex = stateIndex;
  
  const setState = (newValue) => {
    state[currentIndex] = newValue;
    
    // Save to localStorage if key is provided
    if (key) {
      localStorage.setItem(key, JSON.stringify(newValue));
    }

    render(); // Trigger re-render using the imported render function
  };
  
  stateIndex++;
  return [state[currentIndex], setState];
}

export function resetStateIndex() {
  stateIndex = 0; // Reset for the next render
}
