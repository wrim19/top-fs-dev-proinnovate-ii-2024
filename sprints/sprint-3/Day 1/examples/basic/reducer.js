// export function reducer(state, action) {
//     console.log(state, action);
//     // if (action.type === 'increase') {
//     //   return {
//     //     ...state,
//     //     counter: state.counter + 1,
//     //   };
//     // }

//     switch (action.type) {
//       case 'increase':
//         return {
//           ...state,
//           counter: state.counter + 1,
//         };
//       case 'decrease':
//         return {
//           ...state,
//           counter: state.counter - 1,
//         };

//       default:
//         return state;
//     }
//   }

export function reducer(state, action) {
  console.log(state, action);
  switch (action.type) {
    case 'increase':
      const newPrice = action.payload?.price;
      return {
        ...state,
        qty: state.qty + 1,
        total: newPrice ? state.qty * newPrice : state.qty * state.price,
      };
    case 'decrease':
      return {
        ...state,
        qty: state.qty - 1,
      };

    default:
      return state;
  }
}
