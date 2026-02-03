let todos = [];

function addTodo() {
  const input = document.getElementById("todoInput");
  const text = input.value.trim();

  if (text === "") {
    alert("Todo tidak boleh kosong");
    return;
  }

  todos.push({
    id: Date.now(),
    text: text,
    completed: false
  });

  input.value = "";
  renderTodo();
}

function renderTodo() {
  const list = document.getElementById("todoList");
  list.innerHTML = "";

  todos.forEach(todo => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = todo.text;
    span.className = todo.completed ? "completed" : "";
    span.onclick = () => toggleTodo(todo.id);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Hapus";
    deleteBtn.onclick = () => deleteTodo(todo.id);

    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

function toggleTodo(id) {
  todos = todos.map(todo =>
    todo.id === id
      ? { ...todo, completed: !todo.completed }
      : todo
  );
  renderTodo();
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  renderTodo();
}