export const createId = () => {
  return new Date().getTime();
};

const escapeHtml = (text) => {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

export const createTaskInnerHTML = (taskValue) => {
  const id = createId();
  const { content, completed } = taskValue;
  console.log(taskValue);
  console.log(id);
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  todoDiv.setAttribute("id", id);

  todoDiv.innerHTML = `
    <input class="todo-check" type="checkbox" ${completed ? "checked" : ""}>
    <div class="todo-content">${escapeHtml(content)}</div>
    <button class="delete">x</button>
  `;

  return todoDiv;
};

export const completeTodo = (taskId, checkBox, tasks) => {
  const task = tasks.find((task) => task.id === taskId);
  if (checkBox.classList.contains("todo-check")) {
    task.completed = !task.completed;
  }
  localStorage.setItem("taskItems", JSON.stringify(tasks));
};
