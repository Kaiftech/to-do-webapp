const taskInput = document.querySelector("#task-input");
const descriptionInput = document.querySelector("#description-input");
const addTaskButton = document.querySelector("#add-task-btn");
const taskList = document.querySelector("#pending-list");
const completedList = document.querySelector("#completed-list");

function createTaskItem(task, description) {
  const li = document.createElement("li");
  const h4 = document.createElement("h4");
  const p = document.createElement("p");
  const button = document.createElement("button");

  h4.textContent = task;
  p.textContent = description;
  button.textContent = "Delete";

  li.classList.add("task");
  button.classList.add("delete-task");
  li.appendChild(h4);
  li.appendChild(p);
  li.appendChild(button);

  button.addEventListener("click", () => {
    li.remove();
  });

  li.addEventListener("click", () => {
    li.classList.toggle("done");
    if (li.classList.contains("done")) {
      completedList.appendChild(li);
    } else {
      taskList.appendChild(li);
    }
  });

  return li;
}

function addTask() {
  const taskValue = taskInput.value;
  const description = descriptionInput.value;

  if (taskValue.trim() === "") {
    alert("Please enter a task name.");
    return;
  }

  const newTask = createTaskItem(taskValue, description);
  taskList.appendChild(newTask);

  taskInput.value = "";
  descriptionInput.value = "";
}

addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addTask();
  }
});

function removeTask(li) {
  li.remove();
}

function removePendingTask(event) {
  event.preventDefault();
  const li = event.target.closest("li");
  removeTask(li);
}

function removeCompletedTask(event) {
  event.preventDefault();
  const li = event.target.closest("li");
  removeTask(li);
}

function completeTask(event) {
  const checkbox = event.target;
  const li = checkbox.parentNode;

  li.classList.add("done");
  completedList.appendChild(li);
  checkbox.removeEventListener("click", completeTask);
  checkbox.addEventListener("click", uncompleteTask);
  checkbox.disabled = true;
  li.addEventListener("contextmenu", removeCompletedTask);
}

function uncompleteTask(event) {
  const checkbox = event.target;
  const li = checkbox.parentNode;

  li.classList.remove("done");
  taskList.appendChild(li);
  checkbox.removeEventListener("click", uncompleteTask);
  checkbox.addEventListener("click", completeTask);
  checkbox.disabled = false;
  li.addEventListener("contextmenu", removePendingTask);
}

document.addEventListener("DOMContentLoaded", () => {
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const li = checkbox.parentNode;
      li.classList.add("done");
      checkbox.disabled = true;
      checkbox.removeEventListener("click", completeTask);
      checkbox.addEventListener("click", uncompleteTask);
      li.addEventListener("contextmenu", removeCompletedTask);
    } else {
      const li = checkbox.parentNode;
      li.addEventListener("contextmenu", removePendingTask);
    }
  });
});
