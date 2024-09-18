export const store = (reducer, initialState = {}) => {
    let state = initialState;
    let updater = () => {};
  
    const getState = () => state;
  
    const dispatch = (action) => {
      state = reducer(state, action);
      updater();
    };
  
    const subscriber = (listener) => {
      updater = listener;
    };
    return {
      getState,
      dispatch,
      subscriber,
    };
  };