const loadTodos = () => {
  if (!localStorage.getItem("todos")) return;
  const storedTodos = Array.from(JSON.parse(localStorage.getItem("todos")));

  storedTodos.map((todo) => {
    let todosContainer = document.querySelector(".content");
    let todoList = document.createElement("div");
    todoList.classList.add("todo");
    todoList.innerHTML = `
      <input class="check" type="checkbox">
      <div class="todo-list">${todo.todoContent}</div>
      <button class="delete">x</button>
    `;
    todosContainer.appendChild(todoList);
  });
  console.log(storedTodos);
};

window.onload = loadTodos;

// add todo
document.querySelector(".add-todo").addEventListener("click", () => {
  const todoContent = document.querySelector(".input-todo").value;
  if (!todoContent) return;

  localStorage.setItem(
    "todos",
    JSON.stringify([
      ...JSON.parse(localStorage.getItem("todos") || "[]"),
      { todoContent, completed: false },
    ])
  );

  const addTodo = document.createElement("div");
  addTodo.classList.add("todo");
  addTodo.innerHTML = `
    <input class="check" type="checkbox">
    <div class="todo-list">${escapeHtml(todoContent)}</div>
    <button class="delete">x</button>
  `;

  document.querySelector(".content").appendChild(addTodo);
  document.querySelector(".input-todo").value = "";
});

const escapeHtml = (todoInput) => {
  return todoInput
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

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
