import { createId, createTaskInnerHTML, completeTodo } from "./helper.js";

let taskItems = JSON.parse(localStorage.getItem("taskItems")) || [];
const tasksContainer = document.querySelector(".todos");
const taskInput = document.querySelector(".todo-input");

const reloadTasks = (taskItems) => {
  taskItems.forEach((task) => {
    const newTaskInnerHTML = createTaskInnerHTML(task);
    tasksContainer.appendChild(newTaskInnerHTML);
  });
};
reloadTasks(taskItems);

// add task
taskInput.addEventListener("keypress", (e) => {
  const content = taskInput.value;

  if (content.trim() && e.key === "Enter") {
    const task = { id: `${createId()}`, content, completed: false };
    taskItems.push(task);
    localStorage.setItem("taskItems", JSON.stringify(taskItems));
    const newTaskInnerHTML = createTaskInnerHTML(task);
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
