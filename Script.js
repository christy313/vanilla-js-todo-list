const escapeHtml = (input) => {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

let todos = JSON.parse(localStorage.getItem("todos")) || [];
const todosContainer = document.querySelector(".todos");
const todoInput = document.querySelector(".todo-input");

// add todo
todoInput.addEventListener("keypress", (e) => {
  const content = todoInput.value;

  if (content.trim() && e.key === "Enter") {
    const todo = { id: `${new Date().getTime()}`, content, completed: false };
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    addTodo(todo);
  }
});

const addTodo = (todo) => {
  const { id, content } = todo;
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  todoDiv.innerHTML = `
    <input class="todo-check" type="checkbox">
    <div class="todo-content">${escapeHtml(content)}</div>
    <button id=${id} class="delete">x</button>
  `;

  todosContainer.appendChild(todoDiv);
  todoInput.value = "";
};

// delete todo
todosContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    todos = todos.filter((todo) => todo.id !== e.target.getAttribute("id"));
    localStorage.setItem("todos", JSON.stringify(todos));
    e.target.closest("div").remove();
  }
});

// complete todo
todosContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("todo-check")) {
    const checked = e.target.parentNode.classList;
    e.target.checked ? checked.add("done") : checked.remove("done");
  }
});

// if todos exist local storage
if (localStorage.getItem("todos")) {
  todos.map((todo) => addTodo(todo));
}
