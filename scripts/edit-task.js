// Selectors
const todoTitleEdit = document.querySelector(".edit-todo-title");
const todoDateEdit = document.querySelector(".edit-todo-date");
const todoPriorityEdit = document.querySelector(".edit-todo-priority");
const editForm = document.querySelector(".edit-todo-form");

let taskId;
let task;

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  taskId = urlParams.get("id");

  getTodos()
    .then((todos) => {
      task = todos.find((todo) => todo.id === taskId);
      if (task) {
        todoTitleEdit.value = task.title;
        todoDateEdit.value = task.date;
        todoPriorityEdit.value = task.priority;
      } else {
        console.error("Task not found");
      }
    })
    .catch((error) => {
      console.error("Error fetching todos:", error);
    });

  editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (task) {
      let updatedTask = editTask(task);
      updateTodos(updatedTask);
      window.location.href = "index.html";
    }
  });
});

let getTodos = () => {
  return fetch("http://localhost:3000/todos")
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        return data;
      } else {
        return [];
      }
    })
    .catch((error) => {
      console.error("Error fetching todos:", error);
      return [];
    });
};

let findTaskById = (todos, id) => {
  let specificTask = todos.find((todo) => todo.id === id);

  return specificTask;
};

let editTask = () => {
  const updatedTask = {
    id: taskId,
    title: todoTitleEdit.value,
    date: todoDateEdit.value,
    priority: todoPriorityEdit.value,
  };

  return updatedTask;
};

let updateTodos = (updatedTask) => {
  if (updatedTask) {
    fetch(`http://localhost:3000/todos/${updatedTask.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedTask),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    }).catch((error) => console.error("Error fetching todos:", error));
  }
};

let setMinDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const formattedToday = `${yyyy}-${mm}-${dd}`;

  todoDateEdit.setAttribute("min", formattedToday);
};

setMinDate();
