// Selectors
let todoList = document.querySelector(".tasks-container");
let todoCompletedList = document.querySelector(".completed-tasks-container");
let checkBoxes = document.querySelectorAll(".isDone-chkbox");
const taskHeader = document.querySelector(".task-header");
const taskList = document.querySelector("#task-list");

// Functions
let getTodos = () => {
  let todosJSON = localStorage.getItem("todos");
  let todos = JSON.parse(todosJSON) || [];

  return todos;
};

let displayTodos = (todos) => {
  taskList.innerHTML = "";
  todoCompletedList.innerHTML = "";

  let activeTodos = todos.filter((todo) => !todo.isCompleted);
  let completedTodos = todos.filter((todo) => todo.isCompleted);

  if (activeTodos.length > 0) {
    activeTodos.forEach((todo) => {
      let todoHtml = `<div class="task">
          <div class="task-details">
            <p class="task-title">${todo.title}</p>
            <div class="task-info">
              <span class="task-date"><i class="fa-solid fa-calendar-days fa-xs"></i> ${todo.date}</span>
              <span class="task-priority">Priority: ${todo.priority}</span>
            </div>
          </div>
          <div class="task-actions">
            <div class="task-options">
              <button class="collapsible">
                <i class="fa-solid fa-ellipsis"></i>
              </button>
              <div class="collapsible-content">
                <ul>
                  <li><button class="edit-btn" onclick="location.href='edit-task.html?id=${todo.id}';">Edit <i class="fa-solid fa-pen-to-square fa-bounce"></i></button></li>
                  <li><button class="delete-btn" onclick="deleteTodo('${todo.id}');">Delete <i class="fa-solid fa-trash fa-bounce"></i></button></li>
                </ul>
              </div>
            </div>
            <label class="custom-checkbox">
              <input class="isDone-chkbox" id="${todo.id}" type="checkbox" />
            </label>
          </div>
        </div>`;
      taskList.insertAdjacentHTML("beforeend", todoHtml);
    });
  } else {
    taskList.innerHTML = "<p>No active tasks available.</p>";
  }

  if (completedTodos.length > 0) {
    completedTodos.forEach((todo) => {
      let todoHtml = `<div class="completed-task">
          <p class="completed-task-title"><s>${todo.title}</s></p>
          <span class="completed-task-date"><s><i class="fa-solid fa-calendar-days fa-lg"></i> ${todo.date}</s></span>
        </div>`;
      todoCompletedList.insertAdjacentHTML("beforeend", todoHtml);
    });
  } else {
    todoCompletedList.innerHTML = "<p>No completed tasks yet.</p>";
  }
};

displayTodos(getTodos());

let completeTodo = (id) => {
  let listTodos = getTodos();
  let specificTodo = listTodos.find((todo) => todo.id === id);
  specificTodo.isCompleted = true;
  listTodos = listTodos.filter((todo) => todo.id !== specificTodo.id);
  listTodos = [...listTodos, specificTodo];
  let todosJSON = JSON.stringify(listTodos);

  localStorage.setItem("todos", todosJSON);
};

document.querySelectorAll(".isDone-chkbox").forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    completeTodo(checkbox.id);
    refresh();
  });
});

let refresh = () => {
  let countOfTasks = todoList.children.length;
  let countOfCompletedTasks = todoCompletedList.children.length;

  if (countOfTasks > 0) {
    document
      .querySelectorAll(".tasks-container .task")
      .forEach((el) => el.remove());
  }

  if (countOfCompletedTasks > 0) {
    document
      .querySelectorAll(".completed-tasks-container .completed-task")
      .forEach((el) => el.remove());
  }

  displayTodos(getTodos());
};

document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector(".tasks-container")
    .addEventListener("click", function (event) {
      if (event.target.closest(".collapsible")) {
        let collapsible = event.target.closest(".collapsible");
        let content = collapsible.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      }
    });
});

let deleteTodo = (id) => {
  let listTodos = getTodos();
  let updatedTodos = listTodos.filter((todo) => todo.id !== id);
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
  refresh();
};

// For real time date
document.addEventListener("DOMContentLoaded", function () {
  const dateContainer = document.getElementById("current-date");
  const currentDate = new Date();

  const options = {
    year: "numeric",
    month: "long",
  };
  dateContainer.textContent = currentDate.toLocaleDateString("en-US", options);
});
