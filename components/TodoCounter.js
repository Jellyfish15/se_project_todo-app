
class TodoCounter {
  // todos should be the array of initial todos
  // selector is the selector for the counter text element
  constructor(todos, selector) {
    this._element = document.querySelector(selector); // Get the element that displays the counter
    this._completed = todos.filter(todo => todo.completed).length; // Count completed todos
    this._total = todos.length; // Total number of todos
    this._updateText(); // Initialize the text display
  }

  // Call this when a checkbox is clicked, or a completed to-do is deleted
  updateCompleted = (increment) => {
    this._completed += increment ? 1 : -1; // Update completed count
    this._updateText();
  };

  // Call this when a to-do is created or deleted
  updateTotal = (increment) => {
    this._total += increment ? 1 : -1; // Update total count
    this._updateText();
  };

  // Update the counter display text
  _updateText() {
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}

export default TodoCounter;