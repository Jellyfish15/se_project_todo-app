

class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._data = data;
    this._name = data.name;
    this._date = data.date;
    this._id = data.id;
    this._templateElement = document.querySelector(selector);
    this._completed = data.completed;
    this._handleDelete = handleDelete; // Ensure this is passed as a function
    this._handleCheck = handleCheck;
  }

  _remove() {
    this._todoElement.remove(); // Remove the todo element from the DOM
    this._todoElement = null; // Clean up the reference
  }

  _setEventListeners() {
    console.log(this);
    this._deleteBtnEl.addEventListener("click", () => {
      this._handleDelete(this._completed); // Call the delete handler
      this._remove(); // Remove the todo from the DOM
    });

    this._todoCheckboxEl.addEventListener("change", () => {
      this._completed = !this._completed;

      this._handleCheck(this._completed);
    });
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  _formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoDateEl = this._todoElement.querySelector(".todo__date");
    this._deleteBtnEl = this._todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this._data.name;

    
    if (this._data.date && !isNaN(new Date(this._data.date).getTime())) {
      todoDateEl.textContent = `Due: ${this._formatDate(this._data.date)}`;
    } else {
      todoDateEl.textContent = "";
    }

    this._generateCheckboxEl();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;