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
  todoDiv.setAttribute("id", id);

  todoDiv.innerHTML = `
    <input class="todo-check" type="checkbox">
    <div class="todo-content">${escapeHtml(content)}</div>
    <button class="delete">x</button>
  `;

  todosContainer.appendChild(todoDiv);
  todoInput.value = "";
};

// if (localStorage.getItem("todos")) {
//   todos.map((todo) => addTodo(todo));
// }

if (todos) {
  todos.map((todo) => addTodo(todo));
}

// delete todo
todosContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    todos = todos.filter(
      (todo) => todo.id !== e.target.parentNode.getAttribute("id")
    );
    localStorage.setItem("todos", JSON.stringify(todos));
    e.target.closest("div").remove();
  }
});

// complete todo
todosContainer.addEventListener("click", (e) => {
  const todoId = e.target.parentNode.getAttribute("id");
  completeTodo(todoId);
  const checked = e.target.parentNode.classList;
  e.target.checked ? checked.add("done") : checked.remove("done");
});

const completeTodo = (todoId) => {
  todos.map((todo) => {
    if (todo.id === todoId) {
      todo.completed = !todo.completed;
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
};
// local storage data didn't async when reloading
