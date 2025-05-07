import { v4 as uuidv4 } from "https://jspm.dev/uuid"; 
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter
 from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");
const todoCounter = new TodoCounter(initialTodos, ".counter__text");
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);

const renderTodo = (item) => {
  const todo = generateTodo(item);
  section.addItem(todo);
};

function handleDelete (completed) {
  todoCounter.updateTotal(false);  // update the total counter
  if (completed) {
    todoCounter.updateCompleted(false);
  }
}

function handleCheck(isChecked) {
  todoCounter.updateCompleted(isChecked); // update the completed counter
}

const addTodoPopup = new PopupWithForm ({ 
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (data) => {
    renderTodo(data); // Render the new todo

    section.addItem(todoElement);
    addTodoPopup.close();
    addTodoForm.reset();
    newTodoValidator.resetValidation();
  }
});

addTodoPopup.setEventListeners();


const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();
  return todoElement;
};

const section = new Section({ 
  items: initialTodos, 
  renderer:(item) => {
    renderTodo(item);  // just one line of code instead of the 2 lines
  }, 

  containerSelector: ".todos__list"
});

section.renderItems();

newTodoValidator.enableValidation();


/*
const renderTodo = (data) => {
  const todoElement = generateTodo(data); // Generate the todo element
  todosList.prepend(todoElement); // Add the todo to the top of the list
};

// Add event listener for form submission
addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();
  const values = { name, date, id };
  const todo = generateTodo(item);
  todoList.append(todo); // use addItem method instead

  // Use renderTodo to create and add the todo
  renderTodo(values);

  closeModal(addTodoPopupEl);
  newTodoValidator.resetValidation();
});

 // initialTodos.forEach((item) => {
  // const todo = generateTodo(item);
 // section.addItem(todoElement); // use addItem method instead

initialTodos.forEach((item) => {
  renderTodo(item); // Use renderTodo for initial todos
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

*/
