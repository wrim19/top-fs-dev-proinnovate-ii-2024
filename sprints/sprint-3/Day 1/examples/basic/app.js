import { store } from './store.js';
import { reducer } from './reducer.js';

const increase = document.getElementById('increase');
const decrease = document.getElementById('decrease');
const quantity = document.getElementById('counter');
const total = document.getElementById('total');
const price = document.getElementById('price');

const initialState = {
  qty: 0,
  price: 10,
  total: 0,
  tasks: [],
};

const { getState, dispatch, subscriber } = store(reducer, initialState);

subscriber(() => {
  const state = getState();
  quantity.textContent = state.qty;
  total.textContent = state.total;
});

increase.addEventListener('click', () => {
  const priceValue = parseFloat(price.value);
  dispatch({
    type: 'increase',
    payload: {
      price: priceValue,
    },
  });
});

decrease.addEventListener('click', () => {
  dispatch({ type: 'decrease' });
});
