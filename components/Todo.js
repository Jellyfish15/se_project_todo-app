class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._data = data;
    this._name = data.name;
    this._date = data.date;
    this._id = data.id;
    this._templateElement = document.querySelector(selector);
    this._completed = data.completed;
    this._handleCheck = handleCheck; // Function to handle checkbox state change
    this._handleDelete = handleDelete; // Function to handle delete action
  }

  _setEventListeners() {
    this._deleteBtnEl.addEventListener("click", () => {
      this._handleDelete(this._completed);
      this._remove });
  this._checkboxEl.addEventListener("change", () => {
      this._toggleCompletion();
      this._handleCheck(this._completed); // Call the handler with the new state and ID
    });

    const todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
 
   
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

toggleCompletion = () => {
  this._completed = !this._completed;

  _removeTodo = () => {
    // Remove the todo from the list
this._todoElement.remove(
  this._element = null, // Clean up reference
)};


  _handleDelete()  
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
    if (this._data.date && !isNaN(new Date(this._data.date).getTime())) {
      todoDateEl.textContent = `Due: ${this._formatDate(this._data.date)}`;
    } else {
      todoDateEl.textContent = ""; // Leave empty or set a default message
    }

    this._generateCheckboxEl();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
