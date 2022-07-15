// const loadTodos = () => {
//   if (!localStorage.getItem("todos")) return;
//   let storedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
//   storedTodos.map((todo) => {
//     let todosContainer = document.querySelector(".todos");
//     let todoList = document.createElement("div");
//     todoList.classList.add("todo");
//     todoList.innerHTML = `
//       <input class="todo-check" type="checkbox">
//       <div class="todo-content">${todo.content}</div>
//       <button class="delete">x</button>
//     `;
//     todosContainer.appendChild(todoList);
//   });
// };

// window.onload = loadTodos;

const escapeHtml = (todoInput) => {
  return todoInput
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

let todos = JSON.parse(localStorage.getItem("todos")) || [];

const addTodo = (todo) => {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  const { id, content } = todo;
  todoDiv.innerHTML = `
        <input class="todo-check" type="checkbox">
        <div id=${id} class="todo-content">${escapeHtml(content)}</div>
        <button class="delete">x</button>
      `;
  document.querySelector(".todos").appendChild(todoDiv);
  document.querySelector(".todo-input").value = "";
};

// listen to keypress down and add todo
document.querySelector(".todo-input").addEventListener("keypress", (e) => {
  const content = document.querySelector(".todo-input").value;

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
document.querySelector(".todos").addEventListener("click", (e) => {
  if (e.target.classList.contains("todo-check")) {
    const checked = e.target.parentNode.classList;
    e.target.checked ? checked.add("done") : checked.remove("done");
  }
});

// delete todo
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
