const todoTitleAdd = document.querySelector(".todo-title");
const todoDateAdd = document.querySelector(".todo-date");
const todoPriorityAdd = document.querySelector(".todo-priority");

const addForm = document.querySelector(".add-todo-form");

addForm.addEventListener("submit", onSubmitForm);

function onSubmitForm(e) {
  e.preventDefault();

  const uniqueId = Math.random().toString(36).substr(2, 9);

  let taskObject = {
    id: uniqueId,
    title: todoTitleAdd.value,
    date: todoDateAdd.value,
    priority: todoPriorityAdd.value,
    isCompleted: false,
  };

  addTodoItem(taskObject);

  cleanForm();
}

let addTodoItem = (todo) => {
  let todosJSON = localStorage.getItem("todos");
  let todos = JSON.parse(todosJSON) || [];

  todos = [...todos, todo];
  todosJSON = JSON.stringify(todos);

  localStorage.setItem("todos", todosJSON);
};

let cleanForm = () => {
  todoTitleAdd.value = "";
  todoDateAdd.value = "";
  todoPriorityAdd.value = "high";
};

// Function to set minimum date for the date picker
let setMinDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const formattedToday = `${yyyy}-${mm}-${dd}`;

  todoDateAdd.setAttribute("min", formattedToday);
};

setMinDate();
