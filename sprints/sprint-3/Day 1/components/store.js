
// redux store implementation

export const createStore = (reducer, initialState) => {
    let state = initialState;   // Initialize the state
    let updater = () => {};     // Placeholder for the listener function
  
    const getState = () => state;  // Function to get the current state
  
    const dispatch = (action) => {
      state = reducer(state, action);  // Update the state based on the action
      updater();  // Notify the subscriber that state has changed
    };
  
    const subscribe = (listener) => {
      updater = listener;  // Set the listener function
    };
  
    return {
      getState,
      dispatch,
      subscribe,
    };
  };
  