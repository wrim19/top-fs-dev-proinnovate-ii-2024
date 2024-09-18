/**
 *
 * @param {string} tag html tag name
 * @param {string} text text content
 * @param {object} attributes attributes object
 * @returns
 */
export function createElement(tag,  attributes = {}, ...children) {
  const element = document.createElement(tag);

  for (const [key, value] of Object.entries(attributes)) {
    if (key === 'class') {
      element.setAttribute(key, value);
    }
    if (key.startsWith('on') && typeof value === 'function') {
      const eventType = key.substring(2).toLowerCase();
      element.addEventListener(eventType, value);
    }
  }

  children.forEach((child) => {
    console.log({ child });
    if (typeof child === 'string' || typeof child === 'number') {
      element.appendChild(document.createTextNode(child));
      return;
    }
    if (child instanceof HTMLElement) {
      element.appendChild(child);
      return;
    }

    if(child && typeof child.render === 'function') {
        element.appendChild(child.render());
        return;
    }
    // element.appendChild(child);
  });

  return element;
}

export const render = (component, root) => {
    const rootElement = document.getElementById(root);
    rootElement.innerHTML = '';
    rootElement.appendChild(component.render());
};

export function react() {
  return {
    createElement,
  };
}
export function reactDom() {
  return {
    render,
  };
}
