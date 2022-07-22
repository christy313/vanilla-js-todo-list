import { createId, createTaskInnerHTML, checkTodo } from "./helper.js";

let savedTaskItems = JSON.parse(localStorage.getItem("savedTaskItems")) || [];
const tasksContainer = document.querySelector(".todos");
const taskInput = document.querySelector(".todo-input");

const reloadTasks = (savedTaskItems) => {
  savedTaskItems.forEach((task) => {
    const newTaskInnerHTML = createTaskInnerHTML(task);
    tasksContainer.appendChild(newTaskInnerHTML);
  });
};
reloadTasks(savedTaskItems);

// add task
taskInput.addEventListener("keypress", (e) => {
  const content = taskInput.value;

  if (content.trim() && e.key === "Enter") {
    const task = { id: `${createId()}`, content, completed: false };
    savedTaskItems.push(task);
    // it needs to be pushed inside savedTaskItems to save in local storage
    localStorage.setItem("savedTaskItems", JSON.stringify(savedTaskItems));
    const newTaskInnerHTML = createTaskInnerHTML(task);
    tasksContainer.appendChild(newTaskInnerHTML);
    taskInput.value = "";
  }
});

// delete task
tasksContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    savedTaskItems = savedTaskItems.filter(
      (task) => task.id !== e.target.parentNode.getAttribute("id")
    );
    localStorage.setItem("savedTaskItems", JSON.stringify(savedTaskItems));
    e.target.closest("div").remove();
  }
});

// check task
tasksContainer.addEventListener("click", (e) => {
  const checkBox = e.target;
  const taskId = checkBox.parentNode.getAttribute("id");
  checkTodo(taskId, checkBox, savedTaskItems);
  // checkTodo for checked/unchecked a checkbox
});
