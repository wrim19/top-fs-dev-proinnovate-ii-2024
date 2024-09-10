import { createElement, render } from './lib.js';
import { createStore } from './store.js';

const state = {
  counter: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, counter: state.counter + 1 };
    case 'DECREMENT':
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
}

const { getState, dispatch, subscribe } = createStore(reducer, state);

function controls() {
  return {
    render() {
      return createElement(
        'div',
        '',
        {},
        createElement('button', 'Increase', {
          onClick: () => dispatch({ type: 'INCREMENT' }),
        }),
        createElement('button', 'Decrease', {
          onClick: () => dispatch({ type: 'DECREMENT' }),
        })
      );
    },
  };
}

function Counter() {
  return {
    render() {
      return createElement(
        'div',
        '',
        { class: 'container' },
        createElement('h2', 'My Counter', { class: 'header' }),
        createElement('p', getState().counter, {
          class: 'counter',
          onMouseenter: () => console.log('Mouse entered'),
        }),
        controls()
      );
    },
  };
}

function App() {
  return {
    render() {
      return (
        <div>
          <h1>Counter App</h1>
          <p>Count{getState().counter}</p>
          <button onClick={() => dispatch({ type: 'INCREMENT' })}>
            Increment
          </button>
        </div>
      );
    },
  };
}

render(Counter(), 'root');
subscribe(() => render(Counter(), 'root'));
