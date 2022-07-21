import { createId, createTaskInnerHTML, completeTodo } from "./helper.js";

// let savedTaskItems = JSON.parse(localStorage.getItem("")) || [];
const tasksContainer = document.querySelector(".todos");
const taskInput = document.querySelector(".todo-input");

for (const key in localStorage) {
  if (localStorage.hasOwnProperty(key)) {
    let tasks = localStorage.getItem(key);
    console.log(tasks);
    const newTaskInnerHTML = createTaskInnerHTML(tasks);
    tasksContainer.appendChild(newTaskInnerHTML);
  }
}

// add task
taskInput.addEventListener("keypress", (e) => {
  const content = taskInput.value;

  if (content.trim() && e.key === "Enter") {
    const id = createId();
    const taskValue = { content: content, completed: false };
    localStorage.setItem(id, JSON.stringify(taskValue));
    const newTaskInnerHTML = createTaskInnerHTML(taskValue);
    tasksContainer.appendChild(newTaskInnerHTML);
    taskInput.value = "";
  }
});

// delete task
tasksContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    taskItems = taskItems.filter(
      (task) => task.id !== e.target.parentNode.getAttribute("id")
    );
    localStorage.setItem("taskItems", JSON.stringify(taskItems));
    e.target.closest("div").remove();
  }
});

// complete task
tasksContainer.addEventListener("click", (e) => {
  const checkBox = e.target;
  const taskId = checkBox.parentNode.getAttribute("id");
  completeTodo(taskId, checkBox, taskItems);
});
