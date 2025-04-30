// This class is responsible for rendering a list of items and adding new items to the DOM.
// It takes an array of items, a renderer function, and a container selector as parameters. 
  class Section {
    constructor({ items, renderer, containerSelector }) {
      this._items = items; // Array of data to render
      this._renderer = renderer; // Function that creates and adds one item
      this._container = document.querySelector(containerSelector); // DOM container
    }
  
    renderItems() {
      // Loop through all items and call the renderer on each one
      this._items.forEach(item => {
        this._renderer(item);
      });
    }
  
    addItem(element) {
      // Add the element to the DOM container
      this._container.append(element);
    }
  }
  export default Section;