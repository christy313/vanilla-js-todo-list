import { createId, createTaskInnerHTML } from "./helper.js";

let taskItems = JSON.parse(localStorage.getItem("taskItems")) || [];
const todosContainer = document.querySelector(".todos");
const todoInput = document.querySelector(".todo-input");

// add todo
todoInput.addEventListener("keypress", (e) => {
  const content = todoInput.value;

  if (content.trim() && e.key === "Enter") {
    const todo = { id: `${createId()}`, content, completed: false };
    taskItems.push(todo);
    localStorage.setItem("taskItems", JSON.stringify(taskItems));

    const newTaskInnerHTML = createTaskInnerHTML(todo);
    todosContainer.appendChild(newTaskInnerHTML);
    resetTasks();
    todoInput.value = "";
  }
});

const resetTasks = () => {
  if (taskItems) {
    taskItems.map((todo) => createTaskInnerHTML(todo));
  }
};

// delete todo
todosContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    taskItems = taskItems.filter(
      (todo) => todo.id !== e.target.parentNode.getAttribute("id")
    );
    localStorage.setItem("taskItems", JSON.stringify(taskItems));
    e.target.closest("div").remove();
  }
});

// complete todo
todosContainer.addEventListener("click", (e) => {
  const element = e.target;
  const todoId = element.parentNode.getAttribute("id");
  completeTodo(todoId, element);
});

const completeTodo = (todoId, element) => {
  const todo = taskItems.find((todo) => todo.id === todoId);
  // const checked = element.parentNode.classList;
  if (element.classList.contains("todo-check")) {
    todo.completed = !todo.completed;
  }
  localStorage.setItem("taskItems", JSON.stringify(taskItems));
};
