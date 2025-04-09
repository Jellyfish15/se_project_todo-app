class Todo {
  constructor(data, selector) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
  }

  _setEventListeners() {
    // TODO - set up delete button handle
    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = !this._data.completed;
      console.log(this._data.completed);
    });

    const todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

      // Handle delete button click
    todoDeleteBtn.addEventListener("click", () => {
      this._handleDelete();
    });
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  _handleDelete() {
    // Remove the todo element from the DOM
    this._todoElement.remove();
    this._todoElement = null; // Clean up reference
    console.log(`Todo with ID ${this._data.id} deleted`);
  }

  _formatDate(dateString) {
    // Format the date (e.g., "2025-04-10" -> "April 10, 2025")
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoDateEl = this._todoElement.querySelector(".todo__date");
   

    todoNameEl.textContent = this._data.name;

    // Set the due date (if provided)
    if (this._data.date) {
      todoDateEl.textContent = `Due: ${this._formatDate(this._data.date)}`;
    } else {
      todoDateEl.textContent = "No due date";
    }



    this._generateCheckboxEl();
    this._setEventListeners();

    return this._todoElement;
  }
}


export default Todo;
