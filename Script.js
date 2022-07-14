const loadTodos = () => {
  const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  if (!localStorage.getItem("todos")) return;
  console.log(storedTodos);
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
};

window.onload = loadTodos;

// add todo
document.querySelector(".input-todo").addEventListener("keypress", (e) => {
  const todoContent = document.querySelector(".input-todo").value;
  if (!todoContent) return;

  if (e.key === "Enter") {
    document.querySelector(".input-todo").click();
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
        <input class="check" type="checkbox" onClick="todoChecked(checked)">
        <div class="todo-list">${escapeHtml(todoContent)}</div>
        <button class="delete">x</button>
      `;

    document.querySelector(".content").appendChild(addTodo);
    document.querySelector(".input-todo").value = "";
  }
});

const todoChecked = () => {
  const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  const inputs = document.querySelectorAll("input");
  console.log(inputs);
  inputs.forEach((input) => {
    const checkedTodos = storedTodos.find((todo) => {
      todo.todoContent === input.value;
    });
    checkedTodos ? (input.checked = true) : (input.checked = false);
  });

  const setStorage = () => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    inputs.forEach((input) => {
      input.checked ? storedTodos.push({ name: input.value }) : null;
    });
    localStorage.setItem("todos", JSON.stringify(storedTodos));
  };
  setStorage();
};
todoChecked();

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
