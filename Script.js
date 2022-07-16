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
    <input class="todo-check" type="checkbox" ${
      todo.completed ? "checked" : ""
    }>
    <div class="todo-content">${escapeHtml(content)}</div>
    <button class="delete">x</button>
  `;

  todosContainer.appendChild(todoDiv);
  todoInput.value = "";
};

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
  const element = e.target;
  const todoId = element.parentNode.getAttribute("id");
  completeTodo(todoId, element);
});

const completeTodo = (todoId, element) => {
  const todo = todos.find((todo) => todo.id === todoId);
  const checked = element.parentNode.classList;
  if (element.classList.contains("todo-check")) {
    todo.completed = !todo.completed;
  }
  localStorage.setItem("todos", JSON.stringify(todos));
};
