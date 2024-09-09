
import { createSignal, createEffect } from "./reactive.js";


const [count, setCount] = createSignal(0);


// createEffect(() => {
//   console.log(count());
// });

setCount(10);

console.log(count);
setCount(30);
console.log(count); 