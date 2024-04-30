// Selectors
const todoTitleEdit = document.querySelector(".edit-todo-title");
const todoDateEdit = document.querySelector(".edit-todo-date");
const todoPriorityEdit = document.querySelector(".edit-todo-priority");
const editForm = document.querySelector(".edit-todo-form");

let taskId;

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  taskId = urlParams.get("id");

  editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let task = editTask();

    if (task) {
      editTask(task);
      updateTodos(taskId, task);
      cleanForm();
      window.location.href = "index.html";
    }
  });
});

let editTask = () => {
  const updatedTask = {
    id: taskId,
    title: todoTitleEdit.value,
    date: todoDateEdit.value,
    priority: todoPriorityEdit.value,
  };

  return updatedTask;
};

let updateTodos = (taskId, updatedTask) => {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  const index = todos.findIndex((todo) => todo.id == taskId);
  if (index !== -1) {
    todos[index] = updatedTask;
    localStorage.setItem("todos", JSON.stringify(todos));
  }
};

let cleanForm = () => {
  todoTitleEdit.value = "";
  todoDateEdit.value = "";
  todoPriorityEdit.value = "high";
};
