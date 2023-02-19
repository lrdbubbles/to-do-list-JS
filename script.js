const textInput = document.querySelector(".todo__text");
const btnComplete = document.querySelector(".btn__complete");
const btnDelete = document.querySelector(".btn__delete");
const toDoList = document.querySelector(".list__main");
const todoForm = document.querySelector(".form__todo");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

//Submitting the form
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let inputValue = textInput.value;

  if (inputValue.length === 0) return; //error handling

  const todo = {
    id: new Date().getTime(),
    name: inputValue,
    isCompleted: false,
  };

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));

  todoForm.reset();
  todoForm.focus();
  renderTodo(todo);
});

//Adding one element
const renderTodo = (todo) => {
  const listItem = document.createElement("li");
  listItem.setAttribute("id", todo.id);
  listItem.setAttribute("class", "list__item");
  listItem.setAttribute("class", todo.isCompleted ? "completed" : "");
  const html = `<button class="btn__complete">✅</button> ${todo.name} 
  <button class="btn__delete">❌</button>
`;

  listItem.innerHTML = html;
  toDoList.appendChild(listItem);
};

//Initializing
const renderTodos = () => {
  toDoList.innerHTML = "";
  if (localStorage.getItem("todos"))
    todos.forEach((element) => {
      renderTodo(element);
    });
};
renderTodos();

//Removing an element
toDoList.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn__delete")) {
    removeToDo(e.target.closest("li").id);
  }
  if (e.target.classList.contains("btn__complete")) {
    completeTodo(e.target.closest("li").id);
  }
});

removeToDo = (id) => {
  const index = todos.findIndex((object) => {
    return object.id == id;
  });
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
};

//Completing a todo
completeTodo = (id) => {
  const index = todos.findIndex((object) => {
    return object.id == id;
  });
  todos[index].isCompleted = !todos[index].isCompleted;
  renderTodos();
};
