# Reactivity in Vanilla JavaScript

## What is Reactivity?

Reactivity in JavaScript is the concept where changes in the data automatically update the user interface (UI) without the need for manual DOM manipulation. A reactive system listens for changes in the state and automatically updates the DOM based on those changes.

### Why is Reactivity Necessary?

In modern web development, UIs are often dynamic, and changes in data need to be reflected immediately. Without reactivity, developers would need to manually update the DOM every time the data changes, which can lead to inefficient, error-prone code. Reactivity makes applications **more scalable**, **easier to maintain**, and **responsive** to user interactions.

---

## Simple approach

```js
const state = [];
let price = 10;
let quantity=5;
let total = 0

let target = ()=>{
  total = price * quantity;
}
const store=()=>{
  state.push(target)
}

function updateState(){
  state.forEach(fn=>fn())
}

///

store()
target()
console.log(total)
price = 5
updateState()
console.log(total)
quantity=2
updateState()
console.log(total)
```


## How to Achieve Reactivity in Vanilla JavaScript

### 1. Using `Object.defineProperty`

`Object.defineProperty()` is an older method that allows you to define custom behavior whenever a property is accessed or updated. By using it, you can create a reactive system that listens for changes in an object and updates the DOM accordingly.

#### Example:
```js
const appState = {};
Object.defineProperty(appState, "count", {
  get() {
    return this._count;
  },
  set(newValue) {
    this._count = newValue;
    document.getElementById("counter").innerText = newValue;
  },
});

appState.count = 0; // Initial render
document.getElementById("increment").addEventListener("click", () => {
  appState.count += 1; // Reactively updates the UI
});
```
### 1. Using Proxies

The Proxy object is a modern feature of JavaScript that allows you to intercept and redefine operations performed on an object, such as reading, writing, and deleting properties. Proxies are a more powerful and flexible approach to reactivity compared to Object.defineProperty.

Example:
```javascript 
const appState = {
  count: 0,
};

const stateProxy = new Proxy(appState, {
  set(target, property, value) {
    target[property] = value;
    document.getElementById("counter").innerText = value;
    return true;
  },
});

stateProxy.count = 0; // Initial render
document.getElementById("increment").addEventListener("click", () => {
  stateProxy.count += 1; // Reactively updates the UI
});
```

### 3. Using MutationObserver
The MutationObserver API provides the ability to watch for changes in the DOM and react to them. This is useful when you want to detect changes in the DOM and trigger additional logic based on those changes.

Example:
```js
const targetNode = document.getElementById("content");
const config = { childList: true, subtree: true };

const callback = (mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      console.log("New content added:", mutation.addedNodes);
    }
  }
};

const observer = new MutationObserver(callback);
observer.observe(targetNode, config);

// Trigger a mutation
document.getElementById("addText").addEventListener("click", () => {
  const newNode = document.createElement("p");
  newNode.textContent = "New paragraph added!";
  targetNode.appendChild(newNode);
});

```

### 4 The Publish-Subscribe (Pub/Sub) Pattern

The Publish-Subscribe (Pub/Sub) Pattern is a messaging pattern where senders (publishers) of messages do not send them directly to specific receivers (subscribers). Instead, they broadcast or publish the messages, and any interested receivers (subscribers) can subscribe to receive the messages. This pattern allows for loose coupling between the different parts of an application.

#### Key Concepts
- Publisher:

The component that generates and sends (or "publishes") messages. It doesn't know or care which subscribers will receive the message.

- Subscriber:

The component that listens for messages of a certain type. When the subscriber receives the message, it reacts by performing an action.

- Event (or Message):

The information sent by the publisher, which can be data, a signal, or an action. Events are usually categorized by a specific topic or channel.

- Event Bus (or Message Broker):

A central place where publishers send events and where subscribers register to listen to those events. The event bus acts as an intermediary between publishers and subscribers.

#### Why Use the Pub/Sub Pattern?
Decoupling: The publisher does not need to know who the subscribers are. This makes the system easier to scale and maintain because components can be added or removed without affecting others.

- Flexibility: Multiple subscribers can listen for the same event without affecting each other. New functionality can be added by creating new subscribers without modifying the publisher.

- Asynchronous Communication: Pub/Sub can be useful in systems where events occur asynchronously, allowing different parts of the system to react independently.

Example:

1. Create the Pub/Sub System
```js
const PubSub = {
  events: {},

  subscribe: function (eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  },

  publish: function (eventName, data) {
    if (!this.events[eventName]) {
      return;
    }
    this.events[eventName].forEach(callback => callback(data));
  },
};
```

2. Create Publishers and Subscribers

Publisher
The publisher will publish an event when something happens, such as a button click:

```js

document.getElementById("publishButton").addEventListener("click", () => {
  PubSub.publish("buttonClicked", { message: "The button was clicked!" });
});
```
Subscriber
The subscriber will listen for that event and perform an action when it receives it:

```js

// Subscriber: Listen for the "buttonClicked" event
PubSub.subscribe("buttonClicked", (data) => {
  console.log(data.message);
});
```
3. Use the Pub/Sub System

```html
<button id="publishButton">Click Me</button>
```
When the button is clicked, the subscriber will receive the event and log the message.

Benefits of the Pub/Sub Pattern
Loose Coupling: Components can be developed independently since they only need to communicate via events, not direct method calls.

Scalability: Pub/Sub allows multiple subscribers to react to the same event without affecting each other.

Flexibility: New subscribers can be added to listen to events without changing the original publisher logic.

Asynchronous Processing: Pub/Sub allows for more efficient event handling, especially in complex systems with many subscribers.

Example of reactivity using the Pub/Sub Pattern

```js
const PubSub = {
  events: {},

  subscribe: function (eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  },

  publish: function (eventName, data) {
    if (!this.events[eventName]) {
      return;
    }
    this.events[eventName].forEach(callback => callback(data));
  },
};

```
subscribe(eventName, callback): Adds a listener for an event.
publish(eventName, data): Triggers an event, notifying all subscribers.

```js
const state = {
  count: 0,
  setCount: function (newCount) {
    this.count = newCount;
    PubSub.publish('stateChange', { count: this.count });
  },
};
```
state.setCount(newCount): Updates the count and publishes the stateChange event, making it reactive.

```js
// Subscriber: Update the UI when the state changes
PubSub.subscribe('stateChange', (data) => {
  document.getElementById('counter').innerText = `Count: ${data.count}`;
});
```
<div>
  <h1 id="counter">Count: 0</h1>
  <button id="increment">Increment</button>
  <button id="decrement">Decrement</button>
</div>

```js
document.getElementById('increment').addEventListener('click', () => {
  state.setCount(state.count + 1);
});

document.getElementById('decrement').addEventListener('click', () => {
  state.setCount(state.count - 1);
});
```

### Advance Technique Signal

```js
const context = [];

export function createSignal(value) {
    const subscriptions = new Set();

    const read = () => {
        const observer = context[context.length - 1]
        if (observer) subscriptions.add(observer);
        return value;
    }

    const write = (newValue) => {
        value = newValue;
        for (const observer of subscriptions) {
            observer.execute()
        }
    }

    return [read, write];
}

export function createEffect(fn) {
    const effect = {
        execute() {
            context.push(effect);
            fn();
            context.pop();
        }
    }

    effect.execute();
}
```

```js
// Importing the reactive functions
import { createSignal, createEffect } from "./reactive";

// Creating a reactive signal 'count' with initial value 0
const [count, setCount] = createSignal(0);

// Creating an effect that logs the current count
createEffect(() => {
  console.log(count());
}); // Output: 0

// Updating the count and triggering the effect
setCount(10); // Output: 10
```