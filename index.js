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

// key  { id: 1658348546857 }
// value { content: "a", completed: false }

// add task
taskInput.addEventListener("keypress", (e) => {
  const content = taskInput.value;

  if (content.trim() && e.key === "Enter") {
    const key = createId();
    const taskValue = { content, completed: false };
    const taskContent = [key, taskValue];
    taskItems.push(taskContent);
    localStorage.setItem(key, JSON.stringify(taskValue));
    const newTaskInnerHTML = createTaskInnerHTML(key, taskValue);
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
