const taskList = document.querySelector('#task-list');
const addTaskInput = document.querySelector('#add-task-input');
const addTaskBtn = document.querySelector('#add-task');

const tasks = [];
let unDoneTasksCount = 0;

function countUnDoneTasks() {
  unDoneTasksCount = tasks.filter((t) => t.done === false).length;
}

function taskChildOnClick(evt, taskId) {
  const taskIndex = tasks.findIndex((t) => t.getId() === taskId);
  const task = tasks[taskIndex];
  if (!task) return;
  const taskChildId = `#task-${taskId}`;
  const taskChild = taskList.querySelector(taskChildId);
  const targetId = evt.target.getAttribute('id');
  switch (targetId) {
    case `task-${taskId}-imp`:
    case `task-${taskId}-simp`:
      task.setTimeLimit(task.isImportant() ? 0 : 1);
      taskChild.querySelector(`#task-${taskId}-imp`).classList[task.isImportant() ? 'add' : 'remove']('fas');
      taskChild.querySelector(`#task-${taskId}-imp`).classList[task.isImportant() ? 'remove' : 'add']('far');
      break;
    case `task-${taskId}-sdel`:
    case `task-${taskId}-del`:
      taskChild.onanimationend = (e) => {
        if (taskChild.classList.contains('fade-out')) {
          taskList.removeChild(taskChild);
        }
      };
      taskChild.classList.add('fade-out');
      tasks.splice(taskIndex, 1);
      break;
    case `task-${taskId}`:
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
  const taskChild = createTaskChild(task, taskChildOnClick);
  taskList.appendChild(taskChild);
  saveTasks(tasks);
  countUnDoneTasks();
}

function addTaskFunc() {
  const taskTitle = addTaskInput.value;
  if (!taskTitle) return;
  const task = new Task(taskTitle.trim(), '');
  addTaskInput.value = '';
  appendTask(task);
  unDoneTasksCount += 1;
  addTaskInput.select();
}

addTaskBtn.addEventListener('click', addTaskFunc);
addTaskInput.addEventListener('keyup', (e) => {
  if (e.key !== 'Enter') return;
  addTaskFunc();
});

(async () => {
  loadTasks().forEach((task, i) => {
    setTimeout(() => {
      appendTask(task);
    }, (i + 1) * 150);
  });
  loadingDiv.classList.add('d-none');
  if (!sleepDiv.classList.contains('d-none')) return;
  rootDiv.classList.remove('d-none');
})();
