"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var taskList = document.querySelector('#task-list');
var addTaskInput = document.querySelector('#add-task-input');
var addTaskBtn = document.querySelector('#add-task');
var tasks = [];
var unDoneTasksCount = 0;

function countUnDoneTasks() {
  unDoneTasksCount = tasks.filter(function (t) {
    return !t.isDone();
  }).length;
}

function taskChildOnClick(evt, taskId) {
  var taskIndex = tasks.findIndex(function (t) {
    return t.getId() === taskId;
  });
  var task = tasks[taskIndex];
  if (!task) return;
  var taskChildId = "#task-".concat(taskId);
  var taskChild = taskList.querySelector(taskChildId);
  var targetId = evt.target.getAttribute('id');

  switch (targetId) {
    case "task-".concat(taskId, "-imp"):
    case "task-".concat(taskId, "-simp"):
      task.setTimeLimit(task.isImportant() ? 0 : 1);
      taskChild.querySelector("#task-".concat(taskId, "-imp")).classList[task.isImportant() ? 'add' : 'remove']('fas');
      taskChild.querySelector("#task-".concat(taskId, "-imp")).classList[task.isImportant() ? 'remove' : 'add']('far');
      break;

    case "task-".concat(taskId, "-sdel"):
    case "task-".concat(taskId, "-del"):
      taskChild.onanimationend = function (e) {
        if (taskChild.classList.contains('fade-out')) {
          taskList.removeChild(taskChild);
        }
      };

      taskChild.classList.add('fade-out');
      tasks.splice(taskIndex, 1);
      break;

    case "task-".concat(taskId):
    default:
      taskChild.classList[taskChild.classList.contains('text-strike') ? 'remove' : 'add']('text-strike');
      task.setDone(!task.isDone());
      break;
  }

  saveTasks(tasks);
  countUnDoneTasks();
}

function appendTask(task) {
  tasks.push(task);
  var taskChild = createTaskChild(task, taskChildOnClick);
  taskList.appendChild(taskChild);
  saveTasks(tasks);
  countUnDoneTasks();
}

function addTaskFunc() {
  var taskTitle = addTaskInput.value;
  if (!taskTitle) return;
  var task = new Task(taskTitle.trim(), '');
  addTaskInput.value = '';
  appendTask(task);
  addTaskInput.select();
}

addTaskBtn.addEventListener('click', addTaskFunc);
addTaskInput.addEventListener('keyup', function (e) {
  if (e.key !== 'Enter') return;
  addTaskFunc();
});

_asyncToGenerator(function* () {
  loadTasks().forEach(function (task, i) {
    setTimeout(function () {
      appendTask(task);
    }, (i + 1) * 150);
  });
  loadingDiv.classList.add('d-none');
  if (!sleepDiv.classList.contains('d-none')) return;
  rootDiv.classList.remove('d-none');
})();