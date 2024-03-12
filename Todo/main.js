let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs a");
let underline = document.getElementById("under-line");
let menu = document.querySelectorAll("nav:first-child a");
let mode = "all";
let taskList = [];
let filterList = [];

console.log(addButton);
console.log(tabs);

addButton.addEventListener("click", addTask);

function addTask() {
  let task = {
    id: randomId(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  render();
  console.log(taskList);
}

function render() {
  let list = [];
  if (mode === "all") {
    list = taskList;
  } else if (mode === "doing" || mode === "done") {
    list = filterList;
  }
  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task">
      <div class = "task-done">
          ${list[i].taskContent}
      </div>
      <div>
          <button onclick = "toggleComplete('${list[i].id}')">
              Check
          </button>
          <button>
              Delete
          </button>
      </div>
  </div>`;
    } else {
      resultHTML += `<div class="task">
      <div>
          ${list[i].taskContent}
      </div>
      <div>
          <button onclick = "toggleComplete('${list[i].id}')">
              Check
          </button>
          <button onclick = "toggleDelete('${list[i].id}')">
              Delete
          </button>
      </div>
  </div>`;
    }
  }
  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  console.log("id :", id);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
  console.log(taskList);
}

function randomId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

function toggleDelete(id) {
  console.log(taskList);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  if (mode === "all") {
    render();
  } else if (mode === "doing" || mode === "done") {
    filter({ target: { id: mode } });
  }
  console.log(taskList);
}

for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

function filter(event) {
  console.log("filter", event.target.id);
  mode = event.target.id;
  if (mode === "all") {
    render();
  } else if (mode === "doing") {
    filterList = [];
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
    render();
    console.log(filterList);
  } else if (mode === "done") {
    filterList = [];
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}

menu.forEach((menu) => menu.addEventListener("click", (e) => menuIndicator(e)));

function menuIndicator(e) {
  underline.style.left = e.currentTarget.offsetLeft + "px";
  underline.style.width = e.currentTarget.offsetWidth + "px";
  underline.style.top =
    e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
}

function enterKeyPressed(event) {
  if (event.keyCode == 13) {
    addTask();
    taskInput.value = "";
    return true;
  } else {
    return false;
  }
}
