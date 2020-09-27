const rootDiv = document.querySelector('#root');
const loadingDiv = document.querySelector('#loading');
const sleepDiv = document.querySelector('#sleep');
const countdownDiv = rootDiv.querySelector('#countdown');
const countdownAllEls = countdownDiv.querySelectorAll('div.d-flex:not(#sleep)');
const remainingPercentP = countdownDiv.querySelector('#remaining-percent');
const remainingDuration = countdownDiv.querySelector('#remaining-duration');
const remainingHrsP = remainingDuration.querySelector('#hrs');
const remainingMinsP = remainingDuration.querySelector('#mins');
const remainingSecsP = remainingDuration.querySelector('#secs');
const circle = countdownDiv.querySelector('#circle');
const taskList = document.querySelector('#task-list');
const addTaskInput = document.querySelector('#add-task-input');
const addTaskBtn = document.querySelector('#add-task');

const perimeter = circle.getAttribute('r') * Math.PI * 2;
circle.setAttribute('stroke-dasharray', perimeter);

const tasks = [];

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
      break;
  }
  saveTasks(tasks);
}

function appendTask(task) {
  tasks.push(task);
  const taskChild = createTaskChild(task, taskChildOnClick);
  taskList.appendChild(taskChild);
  saveTasks(tasks);
}

addTaskBtn.addEventListener('click', () => {
  const taskTitle = addTaskInput.value;
  if (!taskTitle) return;
  const task = new Task(taskTitle.trim(), '');
  addTaskInput.value = '';
  appendTask(task);
  addTaskInput.select();
});

(async () => {
  const imageUrl = await getBingWallpaperUrl();
  root.style.backgroundImage = `url('${imageUrl}')`;
  loadTasks().forEach((task) => appendTask(task));
  loadingDiv.classList.add('d-none');
  if (!sleepDiv.classList.contains('d-none')) return;
  rootDiv.classList.remove('d-none');
})();
