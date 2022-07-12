// load todos
const loadTodos = () => {
  const storedTodos = localStorage.getItem("todos");
  console.log(storedTodos);
  if (!storedTodos) return;
  const todoLists = Array.from(JSON.parse(storedTodos));
};
window.onload = loadTodos;

// add todo
document.querySelector(".add-todo").addEventListener("click", () => {
  const todo = document.querySelector(".input-todo").value;
  if (!todo) return;

  localStorage.setItem(
    "todos",
    JSON.stringify([
      ...JSON.parse(localStorage.getItem("todos") || []),
      { todo, completed: false },
    ])
  );

  const addTodo = document.createElement("div");
  addTodo.classList.add("todo");
  addTodo.innerHTML = `
    <input class="check" type="checkbox">
    <div class="todo-list">${escapeHtml(todo)}</div>
    <button class="delete">x</button>
  `;

  document.querySelector(".content").appendChild(addTodo);
  document.querySelector(".input-todo").value = "";
});

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// delete todo

document.querySelector(".content").addEventListener("click", (e) => {
  const { target } = e;
  if (target.classList.contains("delete")) {
    target.parentNode.remove();
    return;
  }

  if (target.classList.contains("check")) {
    const chk = target.parentNode.classList;
    target.checked ? chk.add("done") : chk.remove("done");
  }
});
