const loadTodos = () => {
  if (!localStorage.getItem("todos")) return;
  let storedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
  storedTodos.map((todo) => {
    let todosContainer = document.querySelector(".todos");
    let todoList = document.createElement("div");
    todoList.classList.add("todo");
    todoList.innerHTML = `
      <input class="todo-check" type="checkbox">
      <div class="todo-content">${todo.content}</div>
      <button class="delete">x</button>
    `;
    todosContainer.appendChild(todoList);
  });
};

window.onload = loadTodos;

const addTodo = () => {
  document.querySelector(".todo-input").addEventListener("keypress", (e) => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    const content = document.querySelector(".todo-input").value;
    if (!content) return;
    if (e.key === "Enter") {
      localStorage.setItem(
        "todos",
        JSON.stringify([
          ...storedTodos,
          { id: `${new Date().getTime()}`, content, completed: false },
        ])
      );
      const addTodo = document.createElement("div");
      addTodo.classList.add("todo");
      addTodo.innerHTML = `
        <input class="todo-check" type="checkbox">
        <div class="todo-content">${escapeHtml(content)}</div>
        <button class="delete">x</button>
      `;

      document.querySelector(".todos").appendChild(addTodo);
      document.querySelector(".todo-input").value = "";
    }
  });
};
addTodo();

const completeTodo = () => {
  document.querySelector(".todos").addEventListener("click", (e) => {
    if (e.target.classList.contains("todo-check")) {
      const checked = e.target.parentNode.classList;
      e.target.checked ? checked.add("done") : checked.remove("done");
    }
  });
};
completeTodo();

// delete todo
const deleteTodo = () => {
  let storedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
  document.querySelector(".todos").addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
      e.target.closest("div").remove();
    }
    storedTodos.filter((todo) => {
      todo.content !== e.target.previousElementSibling.innerHTML;
    });
    localStorage.setItem("todos", JSON.stringify(storedTodos));
  });
};
deleteTodo();

const escapeHtml = (todoInput) => {
  return todoInput
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};
