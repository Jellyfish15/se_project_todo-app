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



function handleDelete (completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
}

function handleCheck(todoElement, data) {
  const todoCheckboxEl = todoElement.querySelector(".todo__completed");
  data.completed = !data.completed;
  todoCheckboxEl.checked = data.completed;
  todoCounter.updateCompleted(data.completed);
}

const addTodoPopup = new PopupWithForm ({ 
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (data) => {
    const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
    const todoElement = todo.getView();

    section.addItem(todoElement);
    addTodoPopup.close();
    addTodoForm.reset();
    newTodoValidator.resetValidation();
    newTodoValidator.enableValidation();
  }
});
console.log(handleCheck);


addTodoPopup.setEventListeners();


const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();
  return todoElement;
};
 
const section = new Section({ 
  items: initialTodos, 
  renderer:(item) => {
    const todoElement = generateTodo(item);
    section.addItem(todoElement);
  }, 

  containerSelector: ".todos__list"
});

section.renderItems();

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};



function handleEscapeClose(evt) {
  if (evt.key === "Escape") {
    const opemedModal = document.querySelector(".popup_visible");
    addTodoPopup.close();
  }
}

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
  document.addEventListener("keyup", handleEscapeClose);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopupEl);
});


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
