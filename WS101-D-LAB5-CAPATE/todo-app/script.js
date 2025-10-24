const backendUrl = "http://localhost:8080/users/darshan/todos";

async function loadTodos() {
  const response = await fetch(backendUrl);
  todos = await response.json();
  render();
}

async function addTodo(text) {
  const trimmed = text.trim();
  if (!trimmed) return;

  const newItem = {
    id: null,
    username: "darshan",
    description: trimmed,
    targetDate: new Date().toISOString().split("T")[0],
    done: false
  };

  const response = await fetch(backendUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newItem)
  });

  if (response.ok) {
    const savedTodo = await response.json();
    todos.unshift(savedTodo);
    render();
  } else {
    alert("Failed to save todo to backend");
  }
}

async function deleteTodoBackend(id) {
  await fetch(`${backendUrl}/${id}`, { method: "DELETE" });
}

async function toggleDoneBackend(todo) {
  todo.done = !todo.done;
  await fetch(`${backendUrl}/${todo.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo)
  });
}

function render() {
  const todoList = document.getElementById("todoList");
  todoList.innerHTML = "";

  if (todos.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No tasks — add one!";
    li.style.textAlign = "center";
    li.style.opacity = "0.6";
    todoList.appendChild(li);
    return;
  }

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "todo" + (todo.done ? " completed" : "");

    const cb = document.createElement("button");
    cb.className = "checkbox";
    cb.innerHTML = todo.done ? "✓" : "";
    cb.addEventListener("click", async () => {
      await toggleDoneBackend(todo);
      loadTodos();
    });

    const txt = document.createElement("div");
    txt.className = "text";
    txt.textContent = todo.description;

    const del = document.createElement("button");
    del.className = "icon-btn";
    del.innerHTML = "🗑";
    del.addEventListener("click", async () => {
      await deleteTodoBackend(todo.id);
      loadTodos();
    });

    li.appendChild(cb);
    li.appendChild(txt);
    li.appendChild(del);
    todoList.appendChild(li);
  });
}

// Event listeners
document.getElementById("addBtn").addEventListener("click", () => {
  addTodo(document.getElementById("newTodo").value);
  document.getElementById("newTodo").value = "";
});

document
  .getElementById("newTodo")
  .addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addTodo(e.target.value);
      e.target.value = "";
    }
  });

// Initial load
loadTodos();
