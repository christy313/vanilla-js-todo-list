const escapeHtml = (todoInput) => {
  return todoInput
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

let todos = JSON.parse(localStorage.getItem("todos")) || [];
const todosContainer = document.querySelector(".todos");
const todoInput = document.querySelector(".todo-input");

const addTodo = (todo) => {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  const { id, content } = todo;
  todoDiv.innerHTML = `
        <input class="todo-check" type="checkbox">
        <div id=${id} class="todo-content">${escapeHtml(content)}</div>
        <button class="delete">x</button>
      `;
  todosContainer.appendChild(todoDiv);
  todoInput.value = "";
};

// listen to keypress down and add todo
todoInput.addEventListener("keypress", (e) => {
  const content = todoInput.value;

  if (content.trim() && e.key === "Enter") {
    const todo = { id: `${new Date().getTime()}`, content, completed: false };
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    addTodo(todo);
  }
});

// reload todos
if (localStorage.getItem("todos")) {
  todos.map((todo) => addTodo(todo));
}

// complete todo
todosContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("todo-check")) {
    const checked = e.target.parentNode.classList;
    e.target.checked ? checked.add("done") : checked.remove("done");
  }
});

// delete todo
let storedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
todosContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.closest("div").remove();
  }
  storedTodos.filter((todo) => {
    todo.content !== e.target.previousElementSibling.innerHTML;
  });
  localStorage.setItem("todos", JSON.stringify(storedTodos));
});
