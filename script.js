const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

// Create one <li> item
function createTodoItem(todo) {
  const li = document.createElement("li");
  li.dataset.id = todo.id;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = Number(todo.is_done) === 1;

  const span = document.createElement("span");
  span.textContent = todo.text;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✕";          // or "🗑"
  deleteBtn.className = "delete-btn";

  deleteBtn.addEventListener("click", () => deleteTodo(todo.id, li));

  // if already done in DB → apply style + lock checkbox
  if (checkbox.checked) {
    li.classList.add("done");
    checkbox.disabled = true;
  }

  // when checkbox is clicked
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      // mark done (one-way)
      updateTodoStatus(todo.id, 1);
      li.classList.add("done");
      checkbox.disabled = true;  // 🔒 lock it
    } else {
      // don't allow uncheck
      checkbox.checked = true;
    }
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);

  return li;
}



// Load todos from DB via PHP
async function loadTodos() {
  try {
    const res = await fetch("get_todos.php");
    const todos = await res.json();

    list.innerHTML = "";
    todos.forEach((t) => {
      list.appendChild(createTodoItem(t));
    });
  } catch (err) {
    console.error("Failed to load todos", err);
  }
}

// Add new todo
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  const formData = new FormData();
  formData.append("text", text);

  try {
    const res = await fetch("add_todo.php", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      const li = createTodoItem(data);
      list.prepend(li);
      input.value = "";
    } else {
      console.error("Error adding todo:", data.message);
    }
  } catch (err) {
    console.error("Failed to add todo", err);
  }
});

// Delete todo
async function deleteTodo(id, liElement) {
  const formData = new FormData();
  formData.append("id", id);

  try {
    const res = await fetch("delete_todo.php", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      liElement.remove();
    } else {
      console.error("Error deleting todo:", data.message);
    }
  } catch (err) {
    console.error("Failed to delete todo", err);
  }
}


// Initial load
loadTodos();

async function updateTodoStatus(id, is_done) {
  const formData = new FormData();
  formData.append("id", id);
  formData.append("is_done", is_done);

  try {
    await fetch("update_todo.php", {
      method: "POST",
      body: formData
    });
  } catch (err) {
    console.error("Failed to update todo", err);
  }
}
