let inputTxt = document.querySelector(".App-input input");
let btn = document.querySelector(".App-input button");
let taskArea = document.querySelector(".App-tasks ul");

// Function to create a new task
const createTask = (txt) => {
  const newTask = document.createElement("li");
  const crossSpan = document.createElement("span");
  newTask.innerText = txt;
  crossSpan.innerText = "x";

  // Toggle for check or uncheck tasks
  newTask.addEventListener("click", () => {
    newTask.classList.toggle("task-checked");
    saveData();
  });

  // Prevent toggle when clicking delete
  crossSpan.addEventListener("click", (e) => {
    e.stopPropagation();
    newTask.remove();
    saveData();
  });

  newTask.appendChild(crossSpan);
  taskArea.appendChild(newTask);
  saveData();
};

// Event listener for add task button
btn.addEventListener("click", () => {
  const txt = inputTxt.value.trim();
  if (txt) {
    createTask(txt);
    inputTxt.value = "";  // Clear input
    inputTxt.focus();     // Auto-focus back to input
  }
});

// Event listener for Enter key
inputTxt.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const txt = inputTxt.value.trim();
    if (txt) {
      createTask(txt);
      inputTxt.value = "";  // Clear input
      inputTxt.focus();     // Auto-focus back to input
    }
  }
});

// Save tasks to local storage
let saveData = () => {
  localStorage.setItem("TasksData", taskArea.innerHTML);
};

// Load tasks from local storage
let displayLocalStorage = () => {
  taskArea.innerHTML = localStorage.getItem("TasksData") || "";
  // Reapply event listeners to tasks loaded from local storage
  taskArea.querySelectorAll("li").forEach(task => {
    task.addEventListener("click", () => {
      task.classList.toggle("task-checked");
      saveData();
    });
    task.querySelector("span").addEventListener("click", (e) => {
      e.stopPropagation();
      task.remove();
      saveData();
    });
  });
};

displayLocalStorage();

// localStorage.clear();

