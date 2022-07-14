const escapeHtml = (todoInput) => {
  return todoInput
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

// let?
const todos = JSON.parse(localStorage.getItem("todos")) || [];

const loadTodos = () => {
  if (!localStorage.getItem("todos")) return;
  todos.map((todo) => {
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

// add todo
const addTodo = () => {
  document.querySelector(".todo-input").addEventListener("keypress", (e) => {
    const content = document.querySelector(".todo-input").value;
    if (!content) return;
    if (e.key === "Enter") {
      document.querySelector(".todo-input").click();
      localStorage.setItem(
        "todos",
        JSON.stringify([
          ...JSON.parse(localStorage.getItem("todos") || "[]"),
          { id: `${new Date().getTime()}`, content, done: false },
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

  const inputs = document.querySelectorAll("input");
  // console.log(inputs);
  inputs.forEach((input) => {
    const checkedTodos = todos.find((todo) => {
      todo.content === input.value;
    });
    checkedTodos ? (input.checked = true) : (input.checked = false);
  });

  const setStorage = () => {
    inputs.forEach((input) => {
      input.checked ? todos.push({ name: input.value }) : null;
    });
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  setStorage();
};
completeTodo();

// delete todo
const deleteTodo = () => {
  document.querySelector(".todos").addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
      e.target.parentNode.remove();
      // console.log(e.target);
      // console.log(JSON.parse(localStorage.todos)[0].id);
      // console.log(JSON.parse(localStorage.todos)[0]);
      todos.map((todo) => {
        localStorage.removeItem(todo.key);
      });
      localStorage.setItem("todos", JSON.stringify(todos));
      console.log(todos);
      localStorage.removeItem(JSON.parse(localStorage.todos)[0]);
    }
  });
};
deleteTodo();
